exports.run = async (client, message, [type, global]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    const types = {
        credits: "Credits",
        rep: "Rep"
    };

    const Leaders = [];

    var name = global ? "Global Leaderboard" : message.guild.name + " Leaderboard";

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setFooter(name, message.guild.iconURL())
        .setColor(0x04d5fd);
    
    db.all(`SELECT ${type}, userID FROM scores ORDER BY ${types[type.toLowerCase()]} DESC`, [], (err, rows) => {
        if (err) { return console.log(err); }
        var x = 1;
        rows.forEach((row) => {
            if (global) {
                var user = client.users.find("id", row.userID);
                user = (user !== null) ? user.tag : "User abandoned me";
            } else {
                var user = message.guild.members.find("id", `${row.userID}`);
                user = (user !== null) ? user.user.tag : null;
            }
            
            if (x < 10 && user !== null) { 
                if (type.toLowerCase() === "credits") {
                    Leaders.push(`${x}) ${user} - ${types[type.toLowerCase()]}: ${row.credits.toLocaleString()}\n`);
                } if (type.toLowerCase() === "rep") {
                    Leaders.push(`${x}) ${user} - ${types[type.toLowerCase()]}: ${row.rep.toLocaleString()}\n`);
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
};
  
exports.help = {
    name: "leaderboard",
    description: "Check the guild or global leaderboards!",
    usage: "<credits|rep> [global]",
    usageDelim: " ",
};