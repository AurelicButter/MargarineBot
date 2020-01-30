const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

function listMaker(data, items) {
    var keys = Object.keys(data);
    var result = [];

    for (var x = 1; x < keys.length; x++) {
        if (data[keys[x]] > 0) {
            result.push(`${data[keys[x]]} ${items[keys[x]].emote}`);
        }
    }

    if (result.length === 0) { return "You do not have any items in this category."; }
    return result.join(", ");
}

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "inventory",
            enabled: true,
            runIn: ["text"],
            aliases: ["inv"],
            description: "Check your inventory for materials, produced goods, and more!"
        });
    }

    async run(msg) {
        const items = this.client.itemData;
        const embed = new MessageEmbed()
            .setTimestamp()
            .setColor(0x04d5fd)
            .setFooter(`${msg.author.username}'s Inventory`, msg.author.avatarURL());

        var fishData = this.client.dataManager("select", msg.author.id, "fishing");
        if (!fishData) { return msg.channel.send(this.client.speech(msg, ["inventory"])); }

        var harvData = this.client.dataManager("select", msg.author.id, "harvest");
        var prodData = this.client.dataManager("select", msg.author.id, "product");
        var materials = { "misc": [] };

        if (fishData.trash > 0) {
            materials["misc"].push(`${fishData.trash} ${items.trash.emote}`);
        }
        if (prodData.recycle > 0) {
            materials["misc"].push(`${prodData.recycle} ${items.recycle.emote}`);
        }

        if (!materials.misc || materials.misc.length === 0) {
            materials.misc = "You do not have any items in this category.";
        } else if (materials.misc.length === 1) {
            materials.misc = materials.misc[0];
        } else {
            materials.misc = materials.misc.join(", ");
        }

        delete fishData.trash; //Remove for loop to process others
        delete prodData.trash;

        materials.fishing = listMaker(fishData, items);
        materials.harvest = listMaker(harvData, items);
        materials.product = listMaker(prodData, items);

        embed.addField("Materials:", `__Fishing__\n${materials.fishing}\n__Harvest__\n${materials.harvest}`);
        embed.addField("Products:", materials.product);
        embed.addField("Miscellaneous:", materials.misc);

        msg.channel.send({embed});
    }
};