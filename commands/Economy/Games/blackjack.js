const { MessageEmbed } = require("discord.js");
const { Command } = require("klasa");

const suit = ["❤️", "♠️", "♣️", "♦️"];
const number = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

//Split excluded for now. Might expand command later to allow for that.
const actions = ["hit", "fold", "stay", "double"];

const filter = (response) => {
    return actions.some(action => action === response.content.toLowerCase());
};

class PlayerHand {
    constructor(player, card1, card2) {
        this.playerName = player.username;
        this.playerID = player.id;
        this.myHand = [card1, card2];
    }

    dealMe(card) { this.myHand.push(card); }

    calculateHandValue() {
        var total = 0;
        var specialTotal = 0;

        this.myHand.forEach(card => {
            var points = this.calculateCardValue(card);
            total += points[0];
            specialTotal += points[1];
        });

        if (total > 21) { return 0; } // Busted hand

        // Player can't go over 21. Use aces as 1s.
        if (specialTotal > 21) { return total; }
        return specialTotal;
    }

    calculateCardValue(card) {
        if (typeof card.number == "number") {
            return [card.number, card.number];
        } 
        if (card.number != "A") {
            return [10, 10];
        } 

        return [1, 11]; // Card is an A
    }

    checkAutoVictory() {
        return this.calculateHandValue() === 21;
    }

    checkBusted() {
        return this.calculateHandValue() === 0;
    }

    toString() {
        var myDisplay = [];
        for (var x = 0; x < this.myHand.length; x++) {
            myDisplay.push(`${this.myHand[x].suit}${this.myHand[x].number}`);
        }
        return myDisplay.join(", ");
    }

    dealerToString() {
        return `${this.myHand[0].suit}${this.myHand[0].number} + 1 unknown`;
    }
}

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "blackjack",
            enabled: true,
            runIn: ["text"],
            aliases: ["21"],
            description: "Play some blackjack with Margarine",
            usage: "<bet:intcheck{1,}>"
        });

        this.humanUse = "<bet>";
    }

    async run(msg, [bet]) {
        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.sendLocale("DATACHECK_NOACCOUNT"); }
        if (data.credits < bet) { return msg.sendLocale("DATACHECK_LACKCREDIT"); }

        let dealerHand = new PlayerHand(this.client.user, this.dealCard(), this.dealCard());
        let myHand = new PlayerHand(msg.author, this.dealCard(), this.dealCard());

        //Display one dealer card and the player's whole hand with corresponding values.
        const gameMenu = new MessageEmbed()
            .setTimestamp()
            .setFooter(msg.guild.name, msg.guild.iconURL())
            .setColor(0x04d5fd)
            .setTitle("Blackjack Match")
            .setDescription(`${msg.author.tag} vs ${this.client.user.tag}`)
            .addField("Dealer's Hand", dealerHand.dealerToString())
            .addField("Player's Hand", myHand.toString())
            .addField("Avalible Options", actions.join(", "));

        //Determine autowins and await for a player input.
        let targetMsg = await msg.channel.send(gameMenu);

        var playerWin = myHand.checkAutoVictory();
        var dealerWin = dealerHand.checkAutoVictory();

        if (playerWin || dealerWin) { //Detect a blackjack automatically. Declare winner.
            var winner = (dealerWin == playerWin && playerWin == true) + (playerWin == true);
            await this.generateWinDisplay(targetMsg, gameMenu, dealerHand.toString(), winner, "auto");
            return await this.payPlayers(targetMsg, gameMenu, true, winner, myHand, bet);
        }     

        // Player's Turn
        var response, bustedHand;

        while (true) {
            response = await this.collectResponse(targetMsg);
            if (!response) { return; }            
            //Stay & Fold will skip to the results portion.
            if (response != "hit" && response != "double") { break; }

            // Update Player Hand
            myHand.dealMe(this.dealCard());
            gameMenu.fields[1].value = myHand.toString();

            bustedHand = myHand.checkBusted();

            if (response === "double") { 
                bet = bet * 2; 
                break;
            }
            if (bustedHand) { 
                response = "busted";
                break; 
            }
            targetMsg.edit(gameMenu);
        }    

        // Dealer's Turn
        var dealerPoints = dealerHand.calculateHandValue();
        
        while (dealerPoints < 17 && dealerPoints > 0) {
            dealerHand.dealMe(this.dealCard());
            dealerPoints = dealerHand.calculateHandValue();
        }

        //Display results
        var playerPoints = myHand.calculateHandValue();

        if (dealerHand.checkBusted()) { dealerPoints = 0; }
        if (response === "fold") { playerPoints = 0; }

        var playerWins = playerPoints > dealerPoints; // Determine winner. True if player wins.
        if (playerPoints === dealerPoints) { playerWins = 2; } // Tie, no winner.

        await this.generateWinDisplay(targetMsg, gameMenu, dealerHand.toString(), playerWins, response); 
        await this.payPlayers(targetMsg, gameMenu, data, playerWins, myHand, bet);
    };

    /**
     * Generates the Win display for the game.
     * @param {KlasaMessage} msg The message with the active game
     * @param {MessageEmbed} gameMenu The menu used to play the game 
     * @param {String} dealerHand The dealer's current hand
     * @param {Number} winner If 0, house wins. 1 if player wins. 2 if tie.
     */
    generateWinDisplay(msg, gameMenu, dealerDisplay, winner, resCondition) {
        gameMenu.fields[0].value = dealerDisplay;            
        gameMenu.fields[2].name = msg.language.get("BLACKJACK_WINNERTITLE");

        if (winner === false) {
            if (resCondition === "fold") {
                gameMenu.fields[2].value = msg.language.get("BLACKJACK_FOLDED");
            } else if (resCondition === "busted") {
                gameMenu.fields[2].value = msg.language.get("BLACKJACK_BUSTED");
            } else {
                gameMenu.fields[2].value = msg.language.get("BLACKJACK_DEALERWIN");
            }
        } else if (winner === true) {
            gameMenu.fields[2].value = msg.language.get("BLACKJACK_PLAYERWIN");
        } else {
            gameMenu.fields[2].value = msg.language.get("BLACKJACK_NOWINNER");
        }

        return msg.edit(gameMenu);
    }

    async payPlayers(msg, gameMenu, data, playerWins, myHand, amount) {
        var payout;
        if (myHand.calculateHandValue() === 21) { //Award bonus for geting 21
            amount = amount * 1.5;
            payout = await msg.language.get("BLACKJACK_SUCCESS", msg, myHand.playerName, amount);
            this.client.dataManager("update", [`credits=${data.credits + amount * 1.5}`, myHand.playerID], "users");
        } 
        if (playerWins === true) { //Standard payout.
            payout = await msg.language.get("BLACKJACK_SUCCESS", msg, myHand.playerName, amount);
            this.client.dataManager("update", [`credits=${data.credits + amount}`, myHand.playerID], "users");
        } else if (playerWins === 2) {
            payout = await msg.language.get("BLACKJACK_TIE");
        } else { //Player lost.
            payout = await msg.language.get("BLACKJACK_LOSS", msg, myHand.playerName, amount);
            this.client.dataManager("update", [`credits=${data.credits - amount}`, myHand.playerID], "users");
        }

        gameMenu.fields.push({
            name: "Payout",
            value: payout,
            inline: false
        });
        msg.edit(gameMenu);
    }

    dealCard() {
        var suitChoice = this.client.util.getRandom(0, suit.length);
        var numChoice = this.client.util.getRandom(0, number.length);

        return { suit: suit[suitChoice], number: number[numChoice] };
    }

    async collectResponse(menuMsg) {
        var collected = await menuMsg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
		    .catch(() => {
                menuMsg.sendLocale("BLACKJACK_TIMEDOUT", [menuMsg]);
            });
        
        if (!collected) { return; } // No message was collected.
        return collected.entries().next().value[1].content.toLowerCase();
    }
};