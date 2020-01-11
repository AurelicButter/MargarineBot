const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "sell",
            enabled: true,
            runIn: ["text"],
            aliases: [],
            description: "Sell your items!",
            usage: "<item:str> [amount:int]", usageDelim: " "
        });
    }

    async run(msg, [item=item.toLowerCase(), amount]) {
        const itemDB = this.client.itemData[item];
        if (!itemDB) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noItems"])); }

        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return this.client.speech(msg, ["func-dataCheck", "noAccount"]); }

        var itemData = this.client.dataManager("select", msg.author.id, itemDB.category);
        if (!amount) { amount = itemData[item]; }
        if (amount === 0 || !amount) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noZero"])); }
        if (itemData[item] < amount) { return msg.channel.send(this.client.speech(msg, ["sell", "notEnough"])); }

        this.client.dataManager("update", [`credits=${(data.credits + (itemDB.sell * amount))}`, msg.author.id], "users");
        this.client.dataManager("update", [`${item}=${(itemData[item] - amount)}`, msg.author.id], itemDB.category);

        msg.channel.send(this.client.speech(msg, ["sell", "success"], [["-item", itemDB.emote], ["-amount", amount], ["-price", (itemDB.sell * amount)]]));        
    }
};