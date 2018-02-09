exports.run = async (client, message) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");
    let sql = new sqlite3.Database("./assets/data/inventory.sqlite");
    const items = require("../../../assets/values/items.json");

    db.get(`SELECT credits FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("You haven't signed up and received your credits yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); } 
        if (row.credits < 10) { return message.reply("You don't have that many credits, baka!"); }
        else { 
            db.run(`UPDATE scores SET credits = ${row.credits - 10} WHERE userId = ${user.id}`); 

            sql.get(`SELECT * FROM material WHERE userId = "${message.author.id}"`, [], (err, row) => {
                var die = Math.random();

                const itemName = [
                    ["greenapple", "apple", "lemon", "potato", "bread", "rice", "egg", "chocolate"],
                    [row.greenapple, row.apple, row.lemon, row.potato, row.rice, row.egg, row.bread, row.chocolate]
                ];

                if (0 < die && die < .12) { var results = (Math.random() > .5) ? 0 : 1; } 
                if (.12 < die && die < .24) { var results = 2; } 
                if (.24 < die && die < .36) { var results = 3; } 
                if (.36 < die && die < .48) { var results = 4; } 
                if (.48 < die && die < .6) { var results = 5; }
                if (.6 < die && die < .80) { var results = 6; }
                if (.80 < die && die < 1) { var results = 7; }

                var item = items[itemName[0][results]];
                var amount = Number(itemName[1][results]) + 1;
                
                return message.channel.send(`${message.author.username}, you have found ${item.emote}. The item has been placed in your inventory.`);
            });
        }
    });

    db.close();
    sql.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    cooldown: 30,
};
  
exports.help = {
    name: "harvest",
    description: "Harvest fruits and other foods for cooking!",
    usage: "",
};