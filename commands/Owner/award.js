exports.run = async (client, message) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");

    db.get(`SELECT * FROM awards WHERE userID = "Overall"`, [], (err, row) => {
        if (err) { return console.log(err); }
        var sum = row.suggest + row.bugs + row.minor + row.major;
        var reward = (parseInt(row.suggest) * 150) + (parseInt(row.bugs) * 250) + (parseInt(row.minor) * 500) + (parseInt(row.major) * 1000);

        const embed = new client.methods.Embed()
            .setTimestamp()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setColor("#4d5fd")
            .setTitle(`${client.user.username}'s Award System`)
            .setDescription(`*Total awards: ${sum} Total amount given: ${reward}*`)
            .addField("Description:", "For those who have signed up with `m~daily`, there is a way in which users can earn more credits. By suggesting or bug and issue finding and reporting them with the report command, users can earn an amount of credits once the item is added or fixed.")
            .addField("Improvement Rewards (150):", row.suggest, true)
            .addField("Bug Rewards (250):", row.bugs, true)
            .addField("Minor Issues (500):", row.minor, true)
            .addField("Major Issues (1000):", row.major, true);    
        return message.channel.send({embed});
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "awards",
    description: "Information on the awards given out.",
    usage: "",
    usageDelim: "",
};
