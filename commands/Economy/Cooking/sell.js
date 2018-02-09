exports.run = async (client, message, [item, amount]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");
    let sql = new sqlite3.Database("./assets/data/inventory.sqlite");
    let object = require("../../assets/values/items.json");

    db.get(`SELECT credits FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("You have not redeemed your first daily yet!"); }
        else {        
            objects = object[item];
            sql.get(`SELECT ${objects.name} FROM ${objects.type} WHERE userId = "${message.author.id}"`, [], (row) => {
                if (amount > row) { return message.channel.send("You don't have that much " + objects.name + ", baka!"); }
                else { 
                    sql.run(`UPDATE ${objects.type} SET ${objects.name} = ${Number(row) - 1} WHERE userId = ${message.author.id}`);
                    db.run (`UPDATE scores SET credits = ${Number(row.credits) + (objects.price[1] * amount)} WHERE userId = ${message.author.id}`);
                    message.channel.send("You have sold " + amount + " " + objects.name + " for " + (objects.price[1] * amount) + " credits.");
                }
            });
        }
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
    usage: "[item:str] [amount:int]",
    usageDelim: " "
};