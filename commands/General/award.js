exports.run = async (client, msg, [user, type, ...text]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database(client.database.general);
    const settings = client.ownerSetting;

    const embed = new client.methods.Embed()
        .setColor(0x04d5fd)
        .setTimestamp();

    if (user !== undefined && msg.author.id === client.owner.id) {
        if (!type) { return msg.reply(client.speech(msg, ["award", "noType"])); }
        if (!text) { return msg.reply(client.speech(msg, ["award", "noText"])); }

        var data = await client.funcs.userSearch(client, msg, user, ["bot"]);
        if (data === false) { return; }

        db.get(`SELECT credits FROM scores WHERE userId = "${data.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) { return msg.reply(client.speech(msg, ["award", "noRow"])); }
                
            type = type.toLowerCase(); 

            const awards = {
                suggest: ["suggest", settings.awards.suggest],
                bug: ["bug", settings.awards.bug],
                minor: ["minor", settings.awards.minor],
                major: ["major", settings.awards.major]
            };

            db.get(`SELECT ${awards[type][0]} FROM awards WHERE userId = "Overall"`, [], (err, row) => {        
                db.run(`UPDATE awards SET ${awards[type][0]} = ${Object.values(row)[0] + 1} WHERE userId = "Overall"`);
            });

            db.get(`SELECT ${awards[type][0]} FROM awards WHERE userId = "${data.id}"`, [], (err, row) => {        
                db.run(`UPDATE awards SET ${awards[type][0]} = ${Object.values(row)[0] + 1} WHERE userId = "${data.id}"`);
            });

            embed.setTitle(":tada: Award Notification! :tada:")
                .addField(`To ${data.user.tag} for the reason of ${text.join(" ")}`, `User has been awarded ${awards[type][1]} credits!`)
                .setFooter("Awarded to: " + data.user.tag + " (" + data.id + ") on:", data.user.displayAvatarURL());

            msg.reply(client.speech(msg, ["award", "success"]).replace(/-id/g, data.id).replace("-credit", awards[type][1]));
                    
            client.channels.get(settings.channels.award).send({embed});
            db.run(`UPDATE scores SET credits = ${row.credits + awards[type][1]} WHERE userId = "${data.id}"`);
        });
    } else {
        db.get("SELECT * FROM awards WHERE userID = 'Overall'", [], (err, row) => {
            if (err) { return console.log(err); }
            let award = settings.awards;
            var sum = row.suggest + row.bugs + row.minor + row.major;
            var reward = (row.suggest * award.suggest) + (row.bugs * award.bug) + (row.minor * award.minor) + (row.major * award.major);
    
            embed.setTitle(client.user.username + "'s Award System")
                .setDescription(sum + " awards given equaling " + reward + " credits")
                .setFooter(msg.guild.name, msg.guild.iconURL())
                .addField("Description:", "For those who have signed up with the daily command, there is a way in which users can earn more credits. By suggesting or bug and issue finding and reporting them with the report command, users can earn an amount of credits once the item is added or fixed.")
                .addField("Improvements (" + award.suggest +  "):", row.suggest, true)
                .addField("Bugs (" + award.bug + "):", row.bugs, true)
                .addField("Minor Issues (" + award.minor + "):", row.minor, true)
                .addField("Major Issues (" + award.major + "):", row.major, true);    
            msg.channel.send({embed});
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
    usageDelim: " ", humanUse: " "
};