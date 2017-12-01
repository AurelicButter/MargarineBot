exports.run = async (client, message, [type]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");

    const types = {
        credits: "Credits",
        rep: "Rep"
    };

    const Leaders = [];

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setAuthor(`Leaderboards for ${message.guild.name}`, message.guild.iconURL())
        .setColor("#4d5fd")
        .setThumbnail(message.guild.iconURL());
    
    db.all(`SELECT * FROM scores ORDER BY ${types[type.toLowerCase()]} DESC LIMIT 15`, [], (err, rows) => {
        if (err) { return console.log(err); }
        var x = 1;
        rows.forEach((row) => {
            var user = message.guild.members.find("id", `${row.userID}`);
            if (user === null) { x = x + 0; } 
            else if (x < 10 && user !== null) { 
                if (type.toLowerCase() === "credits") {
                    Leaders.push(`${x}) ${user.user.username} - ${types[type.toLowerCase()]}: ${row.credits.toLocaleString()}\n`);
                } if (type.toLowerCase() === "rep") {
                    Leaders.push(`${x}) ${user.user.username} - ${types[type.toLowerCase()]}: ${row.rep.toLocaleString()}\n`);
                }
                x++; 
            } else if (Leaders.length === 10) { return; }
        });
        embed.setDescription(Leaders);
        message.channel.send({embed});
    });
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["lb"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "leaderboard",
    description: "Check the guild leaderboards!",
    usage: "<credits|rep>",
    usageDelim: "",
};