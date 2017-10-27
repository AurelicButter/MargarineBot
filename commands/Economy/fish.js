exports.run = async (client, message, [action, kind, amount]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");
    let user = message.author;

    if (!action) {
        db.get(`SELECT * FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) { return message.reply("You haven't signed up and received your credits yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); } 
            if (row.credits < 5) { return message.reply("You don't have that many credits, baka!"); }
            else { 
                db.run(`UPDATE scores SET credits = ${row.credits - 5} WHERE userId = ${user.id}`); 
                
                die = Math.random();
                
                if (0 < die && die < .5) {
                    kind = "trash";
                    text = "some trash and threw it out";
                    image = ":wastebasket:";
                    result = "You have lost 5 credits";
                } if (.5 < die && die < .75) {
                    kind = "common";
                    text = "a nice fish. A bit small but still good";
                    image = ":fish:";
                    result = "You have placed the fish in your inventory";
                } if (.75 < die && die < .88) {
                    kind = "uncommon";
                    text = "a decent catch. This will catch some decent credits";
                    image = ":crab:";
                    result = "You have placed the fish in your inventory";
                } if (.88 < die && die < .98) {
                    kind = "rare";
                    text = "a fantastic catch! This will fund your gambling habits for awhile";
                    image = ":squid:";
                    result = "You have placed the fish in your inventory";
                } if (.98 < die && die < 1) {
                    kind = "epic";
                    text = "an extremely rare fish! O: That's bound to buy you a house *(No guarantees)*";
                    image = ":shark:";
                    result = "You have placed the fish in your inventory";
                }
                
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
                        return;
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
                
                    message.channel.send(`${user.username}, you have caught ${text}. ${image} ${result}.`);
                });
            }
        });
    } if (action === "inv" || action === "inventory") {
        db.get(`SELECT * FROM fish_inv WHERE userId = "${user.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) { return message.channel.send("You haven't caught any fish yet!"); } 
            else {
                const embed = new client.methods.Embed()
                    .setTimestamp()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setColor("#4d5fd")
                    .setThumbnail(user.avatarURL())
                    .setTitle(`${user.username}'s Fishing Inventory:`)
                    .setDescription("*:eyes: Let's see what you've caught.*");
                    if (row.common > 0) { embed.addField("Common fish:", row.common, true); }
                    if (row.uncommon > 0) { embed.addField("Uncommon fish:", row.uncommon, true); }
                    if (row.rare > 0) { embed.addField("Rare fish:", row.rare, true); }
                    if (row.epic > 0) { embed.addField("Epic fish:", row.epic, true); }    
                    if ((row.common === 0) && (row.uncommon === 0) && (row.rare === 0) && (row.epic === 0)) { embed.addField("There's a slight problem here...", "You don't actually have any fish in your inventory."); }
                return message.channel.send({embed});
            }
        });
    } if (action === "sell") {
        db.get(`SELECT * FROM fish_inv WHERE userId = "${user.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) { return message.channel.send("You haven't caught any fish yet!"); }
            else {
                if (kind === "common") {
                    if (!amount) { amount = row.common; }
                    else if (row.common === 0) { return message.channel.send("You don't have any common fish to sell! D:"); }
                    else if (row.common < amount) { return message.channel.send("You don't have that much fish to sell."); }
                    income = (amount * 5).toFixed(0);
                    db.run(`UPDATE fish_inv SET common = ${row.common - amount} WHERE userId = ${user.id}`);
                    message.channel.send(`You have sold ${amount} common fish and earned ${income} credits!`);
                } if (kind === "uncommon") {
                    if (!amount) { amount = row.uncommon; }
                    else if (row.uncommon === 0) { return message.channel.send("You don't have any uncommon fish to sell! D:"); }
                    else if (row.uncommon < amount) { return message.channel.send("You don't have that much fish to sell."); }
                    income = (amount * 10).toFixed(0);
                    db.run(`UPDATE fish_inv SET uncommon = ${row.uncommon - amount} WHERE userId = ${user.id}`);
                    message.channel.send(`You have sold ${amount} uncommon fish and earned ${income} credits!`);
                } if (kind === "rare") {
                    if (!amount) { amount = row.rare; }
                    else if (row.rare === 0) { return message.channel.send("You don't have any rare fish to sell! D:"); }
                    else if (row.rare < amount) { return message.channel.send("You don't have that much fish to sell."); }
                    income = (amount * 25).toFixed(0);
                    db.run(`UPDATE fish_inv SET rare = ${row.rare - amount} WHERE userId = ${user.id}`);
                    message.channel.send(`You have sold ${amount} rare fish and earned ${income} credits!`);
                } if (kind === "epic") {
                    if (!amount) { amount = row.epic; }
                    else if (row.epic === 0) { return message.channel.send("You don't have any epic fish to sell! D:"); }
                    else if (row.epic < amount) { return message.channel.send("You don't have that much fish to sell."); }
                    income = (amount * 50).toFixed(0);
                    db.run(`UPDATE fish_inv SET epic = ${row.epic - amount} WHERE userId = ${user.id}`);
                    message.channel.send(`You have sold ${amount} Epic fish and earned ${income} credits!`);
                }

                db.get(`SELECT * FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
                    if (err) { return console.log(err); }
                    db.run(`UPDATE scores SET credits = ${parseInt(row.credits) + parseInt(income)} WHERE userId = ${user.id}`);
                });
            }
        });        
    } if (action === "stats") {
        var User = client.funcs.userSearch(client, message, kind);
        if (User.username === null) { return; }
        if (User.bot === true) { return message.reply("Bots can't fish!"); }
        
        db.get(`SELECT * FROM fish_stats WHERE userId = "${User.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) {
                if (User.id === message.author.id) { return message.channel.send("You haven't caught any fish yet!"); } 
                else { return message.channel.send("That user has not caught any fish yet!"); }
            } else {
                sum = row.common + row.uncommon + row.rare + row.epic + row.trash;
                const embed = new client.methods.Embed()
                    .setTimestamp()
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setColor("#4d5fd")
                    .setThumbnail(User.avatarURL())
                    .setTitle(`${User.username}'s Fishing Statistics:`)
                    .setDescription(`*Total catch amount: ${sum}*`)
                    .addField("Trash:", row.trash, true)
                    .addField("Common fish:", row.common, true)
                    .addField("Uncommon fish:", row.uncommon, true)
                    .addField("Rare fish:", row.rare, true)
                    .addField("Epic fish:", row.epic, true);   
                return message.channel.send({embed});
            }
        });
    } if (action !== undefined && action !== "stats" && action !== "inv" && action !== "inventory" && action !== "sell") { 
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
    requiredFuncs: [],
    cooldown: 15,
};
  
exports.help = {
    name: "fish",
    description: "Fish and try to turn your credits into a fortune!",
    usage: "[action:str] [kind:str] [amount:int]",
    usageDelim: " ",
    extendedHelp: "Spend 10 credits to fish and catch yourself a fortune! Check someone's stats with `m~fish stats [user]`. Or check your inventory with `m~fish inv`.",
};
