const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

const board = [
    [":one:", ":two:", ":three:"],
    [":four:", ":five:", ":six:"],
    [":seven:", ":eight:", ":nine:"]
];
const p1Marker = "⭕";
const p2Marker = "❌";

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "tictactoe",
            runIn: ["text"],
            aliases: ["ttt"],
            description: "Play TicTacToe",
            usage: "[user:usersearch]",
            extendedHelp: "Be sure to have your DMs open to allow Margarine to ask for your response! " +
                "Note: If no user is selected, the player can play against Margarine in a friendly duel."
        });

        this.humanUse = "[user]";

        this.filter = (response) => {
            if (response.author.id !== this.activePlayer.id) { return; }
            return Number(response.content) > 0 && Number(response.content) < 10;
        };
        this.activePlayer = null;
        this.author = null;
    }

    async run(msg, [user]) {
        if (user.id === msg.author.id) { 
            if (msg.args.length > 0) { return msg.sendLocale("TTT_SAMEUSER", [msg]); }
            user = this.client.user;
        }

        this.author = msg.author;

        const gameMenu = new MessageEmbed()
            .setTimestamp()
            .setFooter(msg.guild.name, msg.guild.iconURL())
            .setColor(0x04d5fd)
            .setTitle(msg.language.get("TTT_MATCHHEADER"))
            .setDescription(`${msg.author.tag} ${msg.lanugage.get("VERSUS")} ${user.tag}`)
            .addField(msg.language.get("TTT_BOARD"), this.genBoardDisplay(board));

        let gameMsg = await msg.channel.send(gameMenu);

        this.activePlayer = this.author;
        let noWinner = true;

        while (noWinner) {
            let response;
            if (this.activePlayer === this.client.user) {
                response = this.client.util.getRandom(1, 10);
            } else {
                response = await this.collectResponse(gameMsg);
                if (!response) { return; }
            }

            let [row, column] = this.getPosition(response);
        
            if (board[row][column] === p1Marker || board[row][column] === p2Marker) {
                if (this.activePlayer !== this.client.user) {
                    msg.sendLocale("TTT_SPOTTAKEN");
                }
            } else {
                board[row][column] = this.isAuthorActive() ? p1Marker : p2Marker;
                gameMenu.fields[0].value = this.genBoardDisplay(board);

                gameMsg.edit(gameMenu);

                this.activePlayer = this.isAuthorActive() ? user : this.author;
            }
            
            noWinner = !await this.determineWinner(board);
        } 

        gameMenu.fields[1] = {
            name: msg.language.get("WINNER"),
            value: this.isAuthorActive() ? user.tag : this.author.tag
        }

        gameMsg.edit(gameMenu);
    }

    isAuthorActive() {
        return this.activePlayer === this.author;
    }

    /**
    * Get row and column position from the number.
    * @returns An array [Row, Column]
    */
    getPosition(number) {
        return [Math.floor((number - 1) / 3), (number - 1) % 3];
    }

    genBoardDisplay(board) {
        return `${board[0].join(" ")}\n${board[1].join(" ")}\n${board[2].join(" ")}`;   
    }

    async determineWinner(board) {
        for (let x = 0; x < 3; x++) {
            if (board[x][0] === board[x][1] && board[x][1] === board[x][2]) { return true; }
            if (board[0][x] === board[1][x] && board[1][x] === board[2][x]) { return true; } 
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) { return true; }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) { return true; }
        return false;
    }

    async collectResponse(menuMsg) {
        let collected = await menuMsg.channel.awaitMessages(this.filter, { max: 1, time: 30000, errors: ["time"] })
            .catch(() => {
                menuMsg.sendLocale("TTT_TIMEOUT", [menuMsg]);
            });
        
        if (!collected) { return; } // No message was collected.
        return collected.entries().next().value[1].content.toLowerCase();
    }
};