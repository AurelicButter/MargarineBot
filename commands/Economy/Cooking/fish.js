const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "fish",
            enabled: true,
            runIn: ["text"],
            cooldown: 30,
            description: "Fish and try to turn your credits into a fortune!",
            extendedHelp: "Spend 10 credits to fish and catch yourself a fortune! (30 second cooldown)"
        });
    }

    async run(msg) {
        const items = this.client.itemData;

        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noAccount"])); }
        if (data.credits < 10) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "lackCredits"])); }

        const fishType = ["trash", "fish", "crab", "squid", "shark"];

        var die = Math.random();

        if (die < .5) { var results = 0; } 
        else if (die < .75) { var results = 1; } 
        else if (die < .88) { var results = 2; } 
        else if (die < .98) { var results = 3; } 
        else { var results = 4; }

        var kind = fishType[results];

        var fishData = this.client.dataManager("select", msg.author.id, "fishing");

        this.client.dataManager("update", [`${kind}=${(fishData[kind] + 1)}`, msg.author.id], "fishing");
        this.client.dataManager("update", [`credits=${(data.credits - 10)}`, msg.author.id], "users");

        msg.channel.send(this.client.speech(msg, ["fish"], [["-kind", items[kind].emote]]));
    }
};