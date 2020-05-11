const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "chouhan",
            enabled: true,
            runIn: ["text"],
            aliases: ["chōhan"],
            description: "Bet your credits on if the sum of six dice are even or odd.",
            usage: "<even|odd> <bet:intcheck{1,}>", usageDelim: " ",
            extendedHelp: "A simple Japanese dice game. Six dice are rolled and the results kept secret. Players bet on whether the sum on the dice is odd or even."
        });

        this.humanUse = "<even|odd> <bet>";
    }

    async run(msg, [choice=choice.toLowerCase(), bet]) {
        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.sendLocale("DATACHECK_NOACCOUNT"); }
        if (data.credits < bet) { return msg.sendLocale("DATACHECK_LACKCREDIT"); }

        let rolls = [];
        for (var z = 0; z < 6; z++) { rolls.push(Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1)); }

        var sum = rolls[0] + rolls[1] + rolls[2] + rolls[3] + rolls[4] + rolls[5];

        if ((sum%2 === 0 && bet === "even") || (sum%2 !== 0 && bet === "odd")) { 
            this.client.dataManager("update", [`credits=${data.credits + (bet * 2)}`, msg.author.id], "users");
            return msg.sendLocale("CHOUHAN_SUCCESS", [msg, sum, choice, (bet * 2)]);
        }
        
        this.client.dataManager("update", [`credits=${data.credits - bet}`, msg.author.id], "users");
        msg.sendLocale("CHOUHAN_LOSS", [msg, sum, choice, bet]);
    }
};