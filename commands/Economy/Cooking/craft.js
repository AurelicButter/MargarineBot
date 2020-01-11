const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "craft",
            enabled: true,
            runIn: ["text"],
            aliases: ["cook"],
            cooldown: 30,
            description: "Make items",
            usage: "[item:str] [amount:str]", usageDelim: " "
        });
    }

    async run(msg, [item=item.toLowerCase(), amount=1]) {
        const itemDB = this.client.itemData;
        let tarItem = itemDB[item];
        if (!tarItem) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noItems"])); }
        if (!tarItem.recipe) { return msg.channel.send(this.client.speech(msg, ["craft", "noRecipe"])); }

        if (amount === "help") {
            var recipeList = [];
            tarItem.recipe.forEach(element => { recipeList.push(`${element[1]} ${itemDB[element[0]].emote}`); });
        
            const embed = new MessageEmbed()
                .setTitle(`${this.client.util.toTitleCase(tarItem.name)} ${tarItem.emote}`)
                .addField(`Category: ${this.client.util.toTitleCase(tarItem.category)}`, true)
                .addField("Price:", `Buy: ${(tarData.buy || "N/A")} - Sell: ${tarData.sell}`, true)
                .addField("Required items:", recipeList.join(", "))
                .setTimestamp()
                .setFooter(msg.guild.name, msg.guild.iconURL());

            return msg.channel.send({embed});        
        }

        var prodData = this.client.dataManager("select", msg.author.id, "product");
        if (!prodData) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noAccount"])); }
        
        var fishData = this.client.dataManager("select", msg.author.id, "fishing");
        var harvData = this.client.dataManager("select", msg.author.id, "harvest");

        var rList = [];
        tarItem.recipe.forEach(element => rList.push(itemDB[element[0]]));

        amount = amount ? Number(amount) : 1;

        for (var x = 0; x < rList.length; x++) {
            var catData = rList[x].category === "fishing" ? fishData : harvData;

            if ((amount * tarItem.recipe[x][1]) > rList.category) {
                return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noItems"], [["-item", rList[x].emote]]));
            }

            rList[x]["newAmount"] = catData[tarItem.recipe[x][0]] - (amount * tarItem.recipe[x][1]); 
        }

        for (var x = 0; x < rList.length; x++) {
            this.client.dataManager("update", [`${rList[x].name}=${rList[x].newAmount}`, msg.author.id], rList[x].category);
        }

        this.client.dataManager("update", [`${tarItem.name}=${(prodData[tarItem.name] + amount)}`, msg.author.id], "product");
        msg.channel.send(this.client.speech(msg, ["craft", "success"], [["-amount", amount], ["-item", tarItem.emote]]));
    }
};