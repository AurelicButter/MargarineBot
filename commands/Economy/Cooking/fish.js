exports.run = async (client, message, [action, user]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");
    let sql = new sqlite3.Database("./assets/data/inventory.sqlite");
    const items = require("../../../assets/values/items.json");

    var user = user ? client.funcs.userSearch(client, message, {user: user, bot: true}) : message.author ;
    if (user === null) { return; }

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL())
        .setColor(0x04d5fd);

    if (!action) {
        db.get(`SELECT credits FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) { return message.reply("You haven't signed up and received your credits yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); } 
            if (row.credits < 10) { return message.reply("You don't have that many credits, baka!"); }
            else { 
                db.run(`UPDATE scores SET credits = ${row.credits - 10} WHERE userId = ${user.id}`); 

                sql.get(`SELECT * FROM material WHERE userId = "${user.id}"`, [], (err, row) => {
                    var die = Math.random();

                    const Fisher = [
                        ["trash", "fish", "crab", "squid", "shark"],
                        [":wastebasket:", "a :fish:", "a :crab:", "a :squid:", "a :shark:"],
                        [row.trash, row.fish, row.crab, row.squid, row.shark]
                    ];

                    if (0 < die && die < .5) { var results = 0; } 
                    if (.5 < die && die < .75) { var results = 1; } 
                    if (.75 < die && die < .88) { var results = 2; } 
                    if (.88 < die && die < .98) { var results = 3; } 
                    if (.98 < die && die < 1) { var results = 4; }

                    var Fisherbot = die > .5 ? 1 : 0;

                    var kind = Fisher[0][results];
                    var image = Fisher[1][results];
                    var result = (Fisherbot === 0) ? "You have lost 10 credits" : "You have placed the fish in your inventory";
                    var amount = Number(Fisher[2][results]) + 1;

                    if (kind !== "trash") { sql.run(`UPDATE fish SET ${kind} = ${amount} WHERE userId = ${user.id}`); }

                    db.get(`SELECT * FROM fish_stats WHERE userId = "${user.id}"`, [], (err, row) => {
                        const FishStats = {
                            trash: row.trash,
                            fish: row.common,
                            crab: row.uncommon,
                            squid: row.rare,
                            shark: row.epic
                        };
                            
                        db.run(`UPDATE fish_stats SET ${kind} = ${Number(FishStats[kind]) + 1} WHERE userId = ${user.id}`); 
                        return message.channel.send(`${user.username}, you have caught ${image}. ${result}.`);
                    });
                });
            }
        });
    } else if (action === "stats") {        
        db.get(`SELECT * FROM fish_stats WHERE userId = "${user.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) {
                var person = user.id === message.author.id ? "You haven't ": "That user hasn't ";
                return message.channel.send(person + "caught any fish yet!");
            } else {
                embed.setThumbnail(user.avatarURL())
                    .setTitle(`${user.username}'s Fishing Statistics:`)
                    .setDescription(`*Total catch amount: ${(row.common + row.uncommon + row.rare + row.epic + row.trash)}*`)
                    .addField("Trash:", row.trash, true)
                    .addField("Common fish:", row.common, true)
                    .addField("Uncommon fish:", row.uncommon, true)
                    .addField("Rare fish:", row.rare, true)
                    .addField("Epic fish:", row.epic, true);   
                return message.channel.send({embed});
            }
        });
    } else { 
        return message.reply("You didn't provide a valid action. I can either provide you with  showing your stats `m~fish stats` or fishing `m~fish`"); 
    }
    db.close();
    sql.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"],
    cooldown: 30,
};
  
exports.help = {
    name: "fish",
    description: "Fish and try to turn your credits into a fortune!",
    usage: "[action:str] [user:str]",
    usageDelim: " ",
    extendedHelp: "Spend 10 credits to fish and catch yourself a fortune! Check someone's stats with `m~fish stats [user]`. Or check your inventory with `m~fish inv`.",
    humanUse: "(stats)_(user)"
};