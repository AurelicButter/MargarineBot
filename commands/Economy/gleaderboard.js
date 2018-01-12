exports.run = async (client, message, [type]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    const types = {
        credits: "Credits",
        rep: "Rep"
    };

    const Leaders = [];

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setFooter("Global Leaderboards", message.guild.iconURL())
        .setColor(0x04d5fd);
    
    db.all(`SELECT credits, rep, userID FROM scores ORDER BY ${types[type.toLowerCase()]} DESC`, [], (err, rows) => {
        if (err) { return console.log(err); }
        var x = 1;
        rows.forEach((row) => {
            var user = client.users.find("id", row.userID);
            user = user ? user.tag : "User abandoned me";
            if (type.toLowerCase() === "credits") {
                Leaders.push(`${x}) ${user} - ${types[type.toLowerCase()]}: ${row.credits.toLocaleString()}\n`);
            } if (type.toLowerCase() === "rep") {
                Leaders.push(`${x}) ${user} - ${types[type.toLowerCase()]}: ${row.rep.toLocaleString()}\n`);
            } if (Leaders.length === 10) { return; }
            x++;
        });
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
};
  
exports.help = {
    name: "gleaderboard",
    description: "Check the global leaderboards!",
    usage: "<credits|rep>",
    usageDelim: "",
};