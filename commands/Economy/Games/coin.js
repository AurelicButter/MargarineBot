const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "coin",
            enabled: true,
            runIn: ["text"],
            description: "Flip a coin!",
            usage: "<heads|tails> <bet:intcheck{1,}>", usageDelim: " "
        });

        this.humanUse = "<heads|tails> <bet>";
    }

    async run(msg, [choice=choice.toLowerCase(), bet]) {
        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.sendLocale("DATACHECK_NOACCOUNT"); }
        if (data.credits < bet) { return msg.sendLocale("DATACHECK_LACKCREDIT"); }

        let y = Math.random() > .5 ? "Heads": "Tails";

        if (y.toLowerCase() === choice) {
            this.client.dataManager("update", [`credits=${data.credits + (bet * 2)}`, msg.author.id], "users");
            return msg.sendLocale("COIN_SUCCESS", [msg, y, bet]);
        }

        this.client.dataManager("update", [`credits=${data.credits - bet}`, msg.author.id], "users");
        msg.sendLocale("COIN_LOSS", [msg, y, bet]);
    }
};