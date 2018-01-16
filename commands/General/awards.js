exports.run = async (client, message) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");
    const settings = require("../../assets/settings/awards.json");

    db.get("SELECT * FROM awards WHERE userID = 'Overall'", [], (err, row) => {
        if (err) { return console.log(err); }
        var sum = row.suggest + row.bugs + row.minor + row.major;
        var reward = (Number(row.suggest) * settings.suggest) + (Number(row.bugs) * settings.bug) + (Number(row.minor) * settings.minor_issue) + (Number(row.major) * settings.major_issue);

        const embed = new client.methods.Embed()
            .setTimestamp()
            .setColor(0x04d5fd)
            .setTitle(client.user.username + "'s Award System")
            .setDescription(sum + " awards given equaling " + reward + " credits")
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("Description:", "For those who have signed up with the daily command, there is a way in which users can earn more credits. By suggesting or bug and issue finding and reporting them with the report command, users can earn an amount of credits once the item is added or fixed.")
            .addField("Improvements (" + settings.suggest +  "):", row.suggest, true)
            .addField("Bugs (" + settings.bug + "):", row.bugs, true)
            .addField("Minor Issues (" + settings.minor_issue + "):", row.minor, true)
            .addField("Major Issues (" + settings.major_issue + "):", row.major, true);    
        return message.channel.send({embed});
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
    name: "awards",
    description: "Information on the awards given out.",
    usage: "",
    usageDelim: "",
};