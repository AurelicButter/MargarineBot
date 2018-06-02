exports.run = async (client, msg) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/inventory.sqlite");
    const items = require("../../../assets/values/items.json");

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setColor(0x04d5fd)
        .setFooter(msg.author.username + "'s Inventory", msg.author.avatarURL());

    db.get(`SELECT * FROM material WHERE userId = "${msg.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return msg.channel.send("You haven't signed up with `m~daily` yet! D:"); } 
        
        var amounts = Object.values(row);
        var fishing = []; var harvest = []; var x = 2; var y;
        do {
            y = x - 1;
            var z = items.info.material_names[x];
            if (amounts[y] !== null && amounts[y] > 0) {
                if (items[z].category[1] === "fishing") { fishing.push(amounts[y] + items[z].emote); }
                else if (items[z].category[1] === "harvest") { harvest.push(amounts[y] + items[z].emote); }
            }
            x++;
        } while (x < items.info.material_names.length);
        if (fishing.length === 0) { fishing.push("You do not have any fish."); }
        if (harvest.length === 0) { harvest.push("You do not have any harvest materials."); }

        embed.addField("Materials:", `__Fishing__\n${fishing.join(", ")}\n__Harvest__\n${harvest.join(", ")}`);

        db.get(`SELECT * FROM product WHERE userId = "${msg.author.id}"`, [], (err, row) => {
            var amount = Object.values(row);
            var food = []; var x = 1 + items.info.material_names.length; var y = 1;
            do {
                var z = items.info.product_names[y - 1];
                if (amount[y] !== null && amount[y] > 0) {
                    if (items[z].category[1] === "food") { food.push(amount[y] + items[z].emote); }
                }
                x++; y++;
            } while (y - 1 < items.info.product_names.length);

            if (food.length === 0) { food.push("You do not have any food items."); }
            embed.addField("**Products:**", `__Food__\n${food.join(", ")}`);
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
    description: "Check your inventory for materials, produced goods, and more!",
    usage: "",
};