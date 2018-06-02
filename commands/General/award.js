const settings = require("../../assets/settings.json")["owner"];

exports.run = async (client, message, [user, type, ...text]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    const embed = new client.methods.Embed()
        .setColor(0x04d5fd)
        .setTimestamp();

    if (user !== undefined && message.author.id === client.owner.id) {
        if (!type) { return message.reply("BAKA! I need a type of an award!"); }
        if (!text) { return message.reply("Explain yourself on giving the award!"); }

        var data = await client.funcs.userSearch(message, {user: [user], tags:["bot"], name: this.help.name});
        
        if (data.valid === false) { return; }

        db.get(`SELECT credits FROM scores WHERE userId = "${data.user[0].id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) { return message.reply("That user has not gotten their first daily yet!"); }
                
            type = type.toLowerCase(); 

            const awards = {
                suggest: ["suggest", settings.awards.suggest],
                bug: ["bug", settings.awards.bug],
                minor: ["minor", settings.awards.minor],
                major: ["major", settings.awards.major]
            };

            let users = ["Overall", data.user[0].id];
            for (var x = 0; x < users.length; x++) {
                db.get(`SELECT ${awards[type][0]} FROM awards WHERE userId = "${users[x]}"`, [], (err, row) => {        
                    db.run(`UPDATE awards SET ${awards[type][0]} = ${Object.values(row)[0] + 1} WHERE userId = "${users[x]}"`);
                });
            };

            embed.setTitle(":tada: Award Notification! :tada:")
            .addField(`To ${data.user[0].tag} for the reason of ${text.join(" ")}`, `User has been awarded ${awards[type][1]} credits!`)
            .setFooter("Awarded to: " + data.user[0].tag + " (" + data.user[0].id + ") on:", data.user.displayAvatarURL());

            message.reply(data.user[0].ping + `(${data.user[0].id}) have been awarded ${awards[type][1]} credits!`);
                    
            client.channels.get(settings.channels.award).send({embed});
            db.run(`UPDATE scores SET credits = ${row.credits + awards[type][1]} WHERE userId = "${data.user[0].id}"`);
        });
    } else {
        db.get("SELECT * FROM awards WHERE userID = 'Overall'", [], (err, row) => {
            if (err) { return console.log(err); }
            settings = settings.awards;
            var sum = row.suggest + row.bugs + row.minor + row.major;
            var reward = (row.suggest * settings.suggest) + (row.bugs * settings.bug) + (row.minor * settings.minor) + (row.major * settings.major);
    
            embed.setTitle(client.user.username + "'s Award System")
                .setDescription(sum + " awards given equaling " + reward + " credits")
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Description:", "For those who have signed up with the daily command, there is a way in which users can earn more credits. By suggesting or bug and issue finding and reporting them with the report command, users can earn an amount of credits once the item is added or fixed.")
                .addField("Improvements (" + settings.suggest +  "):", row.suggest, true)
                .addField("Bugs (" + settings.bug + "):", row.bugs, true)
                .addField("Minor Issues (" + settings.minor + "):", row.minor, true)
                .addField("Major Issues (" + settings.major + "):", row.major, true);    
            message.channel.send({embed});
        });
    }
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"]
};
  
exports.help = {
    name: "award",
    description: "Information on the awards given out.",
    usage: "[user:str] [suggest|bug|minor|major] [text:str][...]",
    usageDelim: " ",
    humanUse: " "
};