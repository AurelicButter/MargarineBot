const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "rps",
            runIn: ["text"],
            aliases: ["rockpaperscissors"],
            description: "Play Rock, Paper, Scissors",
            usage: "<paper|scissors|rock> [user:usersearch]", usageDelim: " "
        });

        this.humanUse = "<paper|scissors|rock> [user]";
    }

    async run(msg, [choice, user]) {
        if (!user) { user === this.client.user; }
        if (user.id === msg.author.id) { return msg.sendLocale("RPS_SAMEUSER", [msg]); }
        
        var types = ["rock", "paper", "scissors"];
        var hand = types[Math.floor(Math.random() * (Math.floor(2) - Math.ceil(1) + 1)) + Math.ceil(1)];  
                
        if ((choice === "rock" && hand === "scissors") || (choice === "paper" && hand === "rock") || (choice === "scissors" && hand === "paper")) { var result = `${msg.author.username} wins`; } 
        else if ((choice === "rock" && hand === "paper") || (choice === "paper" && hand === "scissors") || (choice === "scissors" && hand === "rock")) { var result = `${user.username} wins`; }
        else { var result = "Draw"; }

        msg.sendLocale("RPS_SUCCESS", [msg, msg.author.username, user.username, choice, hand, result]);
    }
};