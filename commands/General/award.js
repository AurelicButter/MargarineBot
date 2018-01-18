exports.run = async (client, message, [user, type, text]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");
    const settings = require("../../assets/settings/awards.json");

    const embed = new client.methods.Embed()
        .setColor(0x04d5fd)
        .setTimestamp();

    if (message.author.id !== client.owner.id) {
        db.get("SELECT * FROM awards WHERE userID = 'Overall'", [], (err, row) => {
            if (err) { return console.log(err); }
            var sum = row.suggest + row.bugs + row.minor + row.major;
            var reward = (Number(row.suggest) * settings.suggest) + (Number(row.bugs) * settings.bug) + (Number(row.minor) * settings.minor_issue) + (Number(row.major) * settings.major_issue);
    
            embed.setTitle(client.user.username + "'s Award System")
                .setDescription(sum + " awards given equaling " + reward + " credits")
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Description:", "For those who have signed up with the daily command, there is a way in which users can earn more credits. By suggesting or bug and issue finding and reporting them with the report command, users can earn an amount of credits once the item is added or fixed.")
                .addField("Improvements (" + settings.suggest +  "):", row.suggest, true)
                .addField("Bugs (" + settings.bug + "):", row.bugs, true)
                .addField("Minor Issues (" + settings.minor_issue + "):", row.minor, true)
                .addField("Major Issues (" + settings.major_issue + "):", row.major, true);    
            message.channel.send({embed});
        });
    } else {
        var user = client.funcs.userSearch(client, message, user);
    
        if (user.username === null) { return; }
        if (user.bot === true) { return message.reply("You can't give an award to a bot user!"); }

        db.get(`SELECT * FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) { return message.reply("That user has not gotten their first daily yet!"); }
            else { 
                type = type.toLowerCase();
                db.get(`SELECT * FROM awards WHERE userId = "Overall"`, [], (row) => {
                    var awards = {
                        suggest: ["suggest", Number(row.suggest), settings.suggest],
                        bug: ["bug", Number(row.bug), settings.bug],
                        minor: ["minor", Number(row.minor), settings.minor_issue],
                        major: ["major", Number(row.major), settings.major_issue] 
                    };
                });
                db.run(`UPDATE scores SET credits = ${Number(row.credits) + awards[type][2]} WHERE userId = ${user.id}`); 
                db.run(`UPDATE awards SET ${awards[type][0]} = ${awards[type][1] + 1} WHERE userId = "Overall"`);
                db.run(`UPDATE awards SET ${awards[type][0]} = ${awards[type][1] + 1} WHERE userId = "${user.id}"`);
            }
        });
        embed.setTitle(":tada: Award Notification! :tada:")
            .addField(`To ${user.tag} for the reason of ${text}`, `User has been awarded ${awards[type][2]} credits!`)
            .setFooter("Awarded to: " + user.tag + " (" + user.id + ") on:", user.avatarURL());

        message.reply(`<@${user.id}> (${user.id}) have been awarded ${awards[type][2]} credits!`);
        client.channels.get("364846541455753218").send({embed});
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
    usage: "[user:str] [suggest|bug|minor|major] [text:str]",
    usageDelim: " ",
    humanUse: " "
};