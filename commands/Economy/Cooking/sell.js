exports.run = async (client, msg, [item, amount]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/inventory.sqlite");
    let object = require("../../../assets/values/items.json")[item.toLowerCase()];
    if (!object) { return msg.channel.send("That item does not exist."); }
    
    db.get(`SELECT ${object.name} FROM ${object.category[0]} WHERE userId = "${msg.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return msg.reply("You have not redeemed your first daily yet!"); }
        amount = (amount === undefined) ? Object.values(row)[0] : amount;
        if (amount > row) { return msg.channel.send("You don't have that much " + object.name + ", baka!"); }
        
        db.run(`UPDATE ${object.category[0]} SET ${object.name} = ${Object.values(row)[0] - amount} WHERE userId = "${msg.author.id}"`);

        client.funcs.transactions(msg, {credit: [1, "+", (object.price[1] * amount)]}, function(data) {
            if (data.valid === false) { return; }
    
            msg.channel.send("You have sold " + amount + " " + object.name + " for " + data.earnings + " credits.");
        });
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};
  
exports.help = {
    name: "sell",
    description: "Sell your items!",
    usage: "<item:str> [amount:int]",
    usageDelim: " "
};