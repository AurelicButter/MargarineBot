exports.run = async (client, message) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/inventory.sqlite");
    const items = require("../../../assets/values/items.json");

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setColor(0x04d5fd)
        .setFooter(message.author.username + "'s Inventory", message.author.avatarURL());

    db.get(`SELECT * FROM material WHERE userId = "${message.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.channel.send("You haven't signed up with `m~daily` yet! D:"); } 
        else {
            embed.addField("Materials:", `__Fishing__\n${row.fish} ${items.fish.emote}, ${row.crab} ${items.crab.emote}, ${row.squid} ${items.squid.emote}, ${row.shark} ${items.shark.emote}
            \n__Harvest__\n${row.potato} ${items.potato.emote}, ${row.greenapple} ${items.greenapple.emote}, ${row.apple} ${items.apple.emote}, ${row.lemon} ${items.lemon.emote}, ${row.bread} ${items.bread.emote}, ${row.rice} ${items.rice.emote}, ${row.egg} ${items.egg.emote}, ${row.chocolate} ${items.chocolate.emote}`);

            db.get(`SELECT * FROM product WHERE userId = "${message.author.id}"`, [], (err, row) => {
                embed.addField("**Products:**", `__Food__\n${row.fishcake} ${items.fishcake.emote}, ${row.cookie} ${items.cookie.emote}, ${row.oden} ${items.oden.emote}, ${row.sushi} ${items.sushi.emote}`);
                message.channel.send({embed});
            });
        }
    });
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["inv"],
    permLevel: 0,
    botPerms: [],
};
  
exports.help = {
    name: "inventory",
    description: "Check your inventory for materials, produced goods, and more!",
    usage: "",
};