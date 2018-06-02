exports.run = async (client, msg, [item, amount]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/inventory.sqlite");
    let items = require("../../../assets/values/items.json");
    let recipe = require("../../../assets/values/recipes.json");

    if (!item) { return msg.channel.send("You need to define an item to craft, baka!"); }
    var product = items[item.toLowerCase()];

    recipe = recipe[item.toLowerCase()];
    if (!recipe) { return msg.channel.send("I couldn't find a recipe like that!"); }

    if (amount === "help") {
        var recipeList = [];

        recipe.forEach(element => { recipeList.push(element[1] + " " + items[element[0]].emote); });

        const embed = new client.methods.Embed()
            .setTitle(client.funcs.toTitleCase(product.name) + " " + product.emote)
            .addField("Type: " + client.funcs.toTitleCase(product.category[0]), "Subtype: " + client.funcs.toTitleCase(product.category[1]), true)
            .addField("Price:", "Buy: " + product.price[0] + " - Sell: " + product.price[1], true)
            .addField("Required items:", recipeList.join(", "))
            .setTimestamp()
            .setFooter(msg.guild.name, msg.guild.iconURL());

        return msg.channel.send({embed});
    } else {
        amount = amount ? Number(amount) : 1;

        client.funcs.validator({credit: amount, tags:["craft"]}, function(data) {
            if (data.valid === false) { return msg.channel.send(data.msg); }

            let names = [];
            recipe.forEach(element => { names.push(element[0]); });

            db.get(`SELECT ${names} FROM material WHERE userId = "${msg.author.id}"`, [], (err, row) => {
                if (err) { return console.log(err); }
                if (!row) { return msg.reply("You haven't redeemed your first daily yet!"); }
                let invAmount = Object.values(row);

                for (var x = 0; x < recipe.length; x++) {
                    if ((amount * recipe[x][1]) > invAmount[x]) { return msg.channel.send("You do not have enough " + names[x] + "! Please refer to the crafting guide to find out how much you need."); }
                }

                for (var x = 0; x < (recipe.length - 1); x++) {
                    db.run(`UPDATE material SET ${names[0]} = ${invAmount[x] - (amount * recipe[x][1])} WHERE userId = ${msg.author.id}`);
                }

                db.get(`SELECT ${product.name} FROM product WHERE userId ="${msg.author.id}"`, [], (err, row) => {
                    db.run(`UPDATE product SET ${product.name} = ${Object.values(row)[0] + amount} WHERE userId = ${msg.author.id}`);
                });

                msg.channel.send("You have crafted " + amount + " " + product.emote);
            });        
            db.close();
        });
    }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["cook"],
    permLevel: 0,
    botPerms: [],
    cooldown: 30
};
  
exports.help = {
    name: "craft",
    description: "Make items!",
    usage: "[item:str] [amount:str]",
    usageDelim: " ",
    humanUse: "(item name)_(amount|help)"
};