exports.run = async (client, message, [action, kind, amount]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");
    var user = message.author;

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
                
                var die = Math.random();

                const Fisher = [
                    ["trash", "common", "uncommon", "rare", "epic"],
                    ["some trash and threw it out", "a common fish. A bit small but still good", "an uncommon catch. This will catch some decent credits", "a rare catch! This will fund your gambling habits for awhile", "an epic fish! O: That's bound to buy you a house *(No guarantees)*"],
                    [":wastebasket:", ":fish:", ":crab:", ":squid:", ":shark:"],
                    ["You have lost 10 credits", "You have placed the fish in your inventory"]
                ];
                
                if (0 < die && die < .5) { var results = 0; } 
                if (.5 < die && die < .75) { var results = 1; } 
                if (.75 < die && die < .88) { var results = 2; } 
                if (.88 < die && die < .98) { var results = 3; } 
                if (.98 < die && die < 1) { var results = 4; }

                var Fisherbot = die > .5 ? 1:0;

                var kind = Fisher[0][results];
                var text = Fisher[1][results];
                var image = Fisher[2][results];
                var result = Fisher[3][Fisherbot];
                
                db.get(`SELECT * FROM fish_inv WHERE userId = "${user.id}"`, [], (err, row) => {
                    if (err) { return console.log(err); }
                    if (!row) { 
                        return message.reply("Error in finding your information. Fish_inv table is lacking your id!");    
                    } else if (kind === "common") {
                        db.run(`UPDATE fish_inv SET common = ${row.common + 1} WHERE userId = ${user.id}`); 
                    } else if (kind === "uncommon") {
                        db.run(`UPDATE fish_inv SET uncommon = ${row.uncommon + 1} WHERE userId = ${user.id}`); 
                    } else if (kind === "rare") {
                        db.run(`UPDATE fish_inv SET rare = ${row.rare + 1} WHERE userId = ${user.id}`); 
                    } else if (kind === "epic") {
                        db.run(`UPDATE fish_inv SET epic = ${row.epic + 1} WHERE userId = ${user.id}`); 
                    }
                });
                
                db.get(`SELECT * FROM fish_stats WHERE userId = "${user.id}"`, [], (err, row) => {
                    if (err) { return console.log(err); }
                    if (!row) { 
                        return message.reply("Error in finding your information. Fish_stats table is lacking your id!");    
                    } else if (kind === "common") {
                        db.run(`UPDATE fish_stats SET common = ${row.common + 1} WHERE userId = ${user.id}`); 
                    } else if (kind === "uncommon") {
                        db.run(`UPDATE fish_stats SET uncommon = ${row.uncommon + 1} WHERE userId = ${user.id}`); 
                    } else if (kind === "rare") {
                        db.run(`UPDATE fish_stats SET rare = ${row.rare + 1} WHERE userId = ${user.id}`); 
                    } else if (kind === "epic") {
                        db.run(`UPDATE fish_stats SET epic = ${row.epic + 1} WHERE userId = ${user.id}`); 
                    } else if (kind === "trash") {
                        db.run(`UPDATE fish_stats SET trash = ${row.trash + 1} WHERE userId = ${user.id}`);
                    }
                
                    return message.channel.send(`${user.username}, you have caught ${text}. ${image} ${result}.`);
                });
            }
        });
    } else if (action === "inv" || action === "inventory") {
        db.get(`SELECT * FROM fish_inv WHERE userId = "${user.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) { return message.channel.send("You haven't caught any fish yet!"); } 
            else {
                embed.setThumbnail(user.avatarURL())
                    .setTitle(`${user.username}'s Fishing Inventory:`)
                    .setDescription("*:eyes: Let's see what you've caught.*");
                    if (row.common > 0) { embed.addField("Common fish:", row.common, true); }
                    if (row.uncommon > 0) { embed.addField("Uncommon fish:", row.uncommon, true); }
                    if (row.rare > 0) { embed.addField("Rare fish:", row.rare, true); }
                    if (row.epic > 0) { embed.addField("Epic fish:", row.epic, true); }    
                    if (row.common + row.uncommon + row.rare + row.epic === 0) { embed.addField("There's a slight problem here...", "You don't actually have any fish in your inventory."); }
                return message.channel.send({embed});
            }
        });
    } else if (action === "sell") {
        db.get(`SELECT * FROM fish_inv WHERE userId = "${user.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) { return message.channel.send("You haven't caught any fish yet!"); }
            else {
                var store = {
                    common: ["common", row.common, 10],
                    uncommon: ["uncommon", row.uncommon, 15],
                    rare: ["rare", row.rare, 25],
                    epic: ["epic", row.epic, 100],
                    all: "all"
                };

                kind = store[kind][0];

                if (!kind) { return message.channel.send("I'm sorry. I couldn't find that type of fish."); }
                if (kind === "all") {
                    var income = (row.common * 10) + (row.uncommon * 15) + (row.rare * 25) + (row.epic * 100);
                    db.run(`UPDATE fish_inv SET common = 0, uncommon = 0, rare = 0, epic = 0 WHERE userId = ${user.id}`);
                    amount = "of your fish";
                } else {
                    var rowAmount = store[kind][1];
                    if (!amount) { amount = rowAmount; }
                    var income = amount * store[kind][2];

                    if (amount === 0) { return message.channel.send(`You don't have any ${kind} fish to sell! D:`); }
                    if (rowAmount < amount) { return message.channel.send("You don't have that much fish to sell."); }

                    db.run(`UPDATE fish_inv SET ${kind} = ${rowAmount - amount} WHERE userId = ${user.id}`);
                }

                db.run(`UPDATE scores SET credits = ${Number(row.credits) + income} WHERE userId = ${user.id}`);
                message.channel.send(`You have sold ${kind} ${amount} for ${income} credits.`);
            }
        });        
    } else if (action === "stats") {
        user = client.funcs.userSearch(client, message, kind);
        if (user.username === null) { return; }
        if (user.bot === true) { return message.reply("Bots can't fish!"); }
        
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
        return message.reply("You didn't provide a valid action. I can either provide you with selling `m~fish sell [type]`, showing your inventory `m~fish inv`, showing your stats `m~fish stats`, or fishing `m~fish`"); 
    }
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"],
    cooldown: 15,
};
  
exports.help = {
    name: "fish",
    description: "Fish and try to turn your credits into a fortune!",
    usage: "[action:str] [kind:str] [amount:int]",
    usageDelim: " ",
    extendedHelp: "Spend 10 credits to fish and catch yourself a fortune! Check someone's stats with `m~fish stats [user]`. Or check your inventory with `m~fish inv`.",
};