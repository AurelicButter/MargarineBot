const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "harvest",
            enabled: true,
            runIn: ["text"],
            cooldown: 30,
            description: "Harvest fruits and other foods for cooking!",
            extendedHelp: "Spend 10 credits to gather materials! (30 second cooldown)"
        });
    }

    async run(msg) {
        const items = this.client.itemData;

        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noAccount"])); }
        if (data.credits < 10) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "lackCredits"])); }

        const harvType = ["greenapple", "apple", "lemon", "potato", "bread", "rice", "egg", "chocolate"];

        var die = Math.random();

        if (die < .06) { var results = 0; } 
        else if (die < .12) { var results = 1; }
        else if (die < .24) { var results = 2; } 
        else if (die < .36) { var results = 3; } 
        else if (die < .48) { var results = 4; } 
        else if (die < .6) { var results = 5; }
        else if (die < .80) { var results = 6; }
        else { var results = 7; }

        var item = harvType[results];

        var harvData = this.client.dataManager("select", msg.author.id, "harvest");

        this.client.dataManager("update", [`${item}=${(harvData[item] + 1)}`, msg.author.id], "harvest");
        this.client.dataManager("update", [`credits=${(data.credits - 10)}`, msg.author.id], "users");

        msg.channel.send(this.client.speech(msg, ["harvest"], [["-kind", items[item].emote]]));
    }
};