exports.run = async (client, msg) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database(client.database.inv);
    const items = client.database.items;

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setColor(0x04d5fd)
        .setFooter(msg.author.username + "'s Inventory", msg.author.avatarURL());

    db.get(`SELECT * FROM material WHERE userId = "${msg.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return msg.channel.send(client.speech(["noRow"], msg)); }
        
        var amounts = Object.values(row);
        var material = [[], [], []];

        for (var x = 1; x < items.info.material_names.length; x++) {
            var y = items.info.material_names[x];
            if (amounts[x] !== null && amounts[x] > 0) {
                switch (items[y].category[1]) {
                    case "fishing": material[0].push(amounts[x] + items[y].emote); break;
                    case "harvest": material[1].push(amounts[x] + items[y].emote); break;
                    case "misc": material[2].push(amounts[x] + items[y].emote); break;
                }
            }
        }
        if (material[0].length === 0) { material[0].push("You do not have any fish."); }
        if (material[1].length === 0) { material[1].push("You do not have any harvest materials."); }
        if (material[2].length === 0) { material[2].push("You do not have any misc materials."); } 
        embed.addField("Materials:", `__Fishing__\n${material[0].join(", ")}\n__Harvest__\n${material[1].join(", ")}\n__Misc__\n${material[2].join(", ")}`);

        db.get(`SELECT * FROM product WHERE userId = "${msg.author.id}"`, [], (err, row) => {
            var amount = Object.values(row);
            var product = [[], []];

            for (var x = 1; x < items.info.product_names.length; x++) {
                var y = items.info.product_names[x];
                if (amount[x] !== null && amount[x] > 0) {
                    switch (items[y].category[1]) {
                        case "food": product[0].push(amount[x] + items[y].emote); break;
                        case "material[2]": product[1].push(amount[x] + items[y].emote); break;
                    }
                }
            }
            if (product[0].length === 0) { product[0].push("You do not have any food items."); }
            if (product[1].length === 0) { product[1].push("You do not have any material[2] materials."); } 
            embed.addField("**Products:**", `__Food__\n${product[0].join(", ")}\n__material[2]__\n${product[1].join(", ")}`);

            msg.channel.send({embed});
        });
    });
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["inv"],
    permLevel: 0,
    botPerms: []
};
  
exports.help = {
    name: "inventory",
    description: "Check your inventory for materials, produced goods, and more!", usage: ""
};