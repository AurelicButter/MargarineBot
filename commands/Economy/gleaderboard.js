exports.run = async (client, message, [type]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");

    const types = {
        credits: "Credits",
        rep: "Rep"
    }

    const Leaders = [];

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setAuthor(`Leaderboards for ${message.guild.name}`, message.guild.iconURL())
        .setColor("#4d5fd")
        .setThumbnail(message.guild.iconURL());
    
    db.all(`SELECT * FROM scores ORDER BY ${types[type.toLowerCase()]} DESC LIMIT 10`, [], (err, rows) => {
        if (err) { throw err; }
        var x = 1;
        if (type.toLowerCase() === "credits") {
            rows.forEach((row) => {
                var user = client.funcs.userSearch(client, message, row.userID);
                Leaders.push(`${x}) ${user.username} - ${types[type.toLowerCase()]}: ${row.credits.toLocaleString()}\n`);
                x++;
            });
        } if (type.toLowerCase() === "rep") {
            rows.forEach((row) => {
                var user = client.funcs.userSearch(client, message, row.userID);
                Leaders.push(`${x}) ${user.username} - ${types[type.toLowerCase()]}: ${row.rep.toLocaleString()}\n`);
                x++;
            });
        }
        embed.setDescription(Leaders);
        message.channel.send({embed});
    });

    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["glb"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "gleaderboard",
    description: "Check the global leaderboards!",
    usage: "<credits|rep>",
    usageDelim: "",
};
