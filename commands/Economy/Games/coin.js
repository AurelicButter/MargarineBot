const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "coin",
            enabled: true,
            runIn: ["text"],
            description: "Flip a coin!",
            usage: "<heads|tails> <bet:int>", usageDelim: " "
        });

        this.humanUse = "<heads|tails> <bet>";
    }

    async run(msg, [choice=choice.toLowerCase(), bet]) {
        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noAccount"])); }
        if (data.credits < bet) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "lackCredits"])); }

        let y = Math.random() > .5 ? "Heads": "Tails";

        if (y.toLowerCase() === choice) {
            this.client.dataManager("update", [`credits=${data.credits + (bet * 2)}`, msg.author.id], "users");
            return msg.channel.send(this.client.speech(msg, ["coin", "win"], [["-result", y], ["-earning", bet]]));
        }

        this.client.dataManager("update", [`credits=${data.credits - bet}`, msg.author.id], "users");
        msg.channel.send(this.client.speech(msg, ["coin", "lose"], [["-result", y], ["-earning", bet]]));
    }
};