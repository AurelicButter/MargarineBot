const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "rps",
            runIn: ["text"],
            aliases: ["rockpaperscissors"],
            description: "Play Rock, Paper, Scissors",
            usage: "[user:usersearch]",
            extendedHelp: "Be sure to have your DMs open to allow Margarine to ask for your response! " +
                "Note: If no user is selected, the player can play against Margarine in a friendly duel."
        });

        this.humanUse = "[user]";
    }

    async run(msg, [user]) {
        if (user.id === msg.author.id) { 
            if (msg.args.length > 0) { return msg.sendLocale("RPS_SAMEUSER", [msg]); }
            user = this.client.user;
        }

        var player1Hand, player2Hand, result;
        const types = ["rock", "paper", "scissors"];
        const filter = (response) => {
            return types.some(type => type === response.content.toLowerCase());
        };

        await msg.author.sendLocale("RPS_PROMPT", [msg]);
        var player1 = await msg.author.dmChannel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
            .catch(collected => {
                msg.author.sendLocale("RPS_TIMEOUTPROMPT", [msg]);
            });
        
        if (!player1) { return msg.sendLocale("RPS_TIMEOUT", [msg, msg.author.username]); }
        player1Hand = types[types.indexOf(player1.first().content.toLowerCase())];

        if (user.id !== this.client.user.id) {
            await user.sendLocale("RPS_PROMPT", [msg]);
            var player2 = await user.dmChannel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
                    .catch(collected => {
                        msg.author.sendLocale("RPS_TIMEOUTPROMPT", [msg]);
                    });

            if (!player2) { return msg.sendLocale("RPS_TIMEOUT", [msg, user.username]); }
            player2Hand = types[types.indexOf(player2.first().content.toLowerCase())];
        } else {
            player2Hand = types[Math.floor(Math.random() * (Math.floor(2) - Math.ceil(1) + 1)) + Math.ceil(1)]; 
        }    

        if ((player1Hand === "rock" && player2Hand === "scissors") || (player1Hand === "paper" && player2Hand === "rock") 
            || (player1Hand === "scissors" && player2Hand === "paper")) { 
                result = `${msg.author.username} wins`;
        }
        else if ((player1Hand === "paper" && player2Hand === "scissors") || (player1Hand === "rock" && player2Hand === "paper") 
            || (player1Hand === "scissors" && player2Hand === "rock")) { 
                result = `${user.username} wins`;
        }
        else { result = "Draw"; }

        msg.sendLocale("RPS_SUCCESS", [msg, msg.author.username, user.username, player1Hand, player2Hand, result]);
    }
};