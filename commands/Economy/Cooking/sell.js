const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "sell",
            enabled: true,
            runIn: ["text"],
            description: "Sell your items!",
            usage: "<item:str> [amount:int]", usageDelim: " "
        });
    }

    async run(msg, [item=item.toLowerCase(), amount]) {
        if (amount === 0) { return msg.sendLocale("DATACHECK_NOZERO"); }

        const itemDB = this.client.itemData[item];
        if (!itemDB) { return msg.sendLocale("DATACHECK_NOITEMS"); }

        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.sendLocale("DATACHECK_NOACCOUNT"); }

        var itemData = this.client.dataManager("select", msg.author.id, itemDB.category);
        if (!amount) { amount = itemData[item]; }        
        if (itemData[item] < amount) { return msg.sendLocale("SELL_NOTENOUGH", [msg]); }

        this.client.dataManager("update", [`credits=${(data.credits + (itemDB.sell * amount))}`, msg.author.id], "users");
        this.client.dataManager("update", [`${item}=${(itemData[item] - amount)}`, msg.author.id], itemDB.category);

        msg.sendLocale("SELL", [msg, itemDB.emote, amount, (itemDB.sell * amount)]);       
    }
};