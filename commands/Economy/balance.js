exports.run = async (client, message, [user]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    user = client.funcs.userSearch(client, message, user);
    
    if (user.username === undefined) { return; }
    if (user.bot === true) { return message.reply("Bots don't have any records!"); }

    db.get(`SELECT * FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("That person hasn't signed up with `m~daily` yet! D:"); } 

        var Time = (((Date.now() - row.daily) / 86400000)).toFixed(2);
        var time = (((Date.now() - row.repDaily) / 86400000)).toFixed(2);
        if (Time >= 14) { Time = (Time / 7).toFixed(2) + " weeks ago"; }
        else if (Time >=1) { Time = Time + " days ago"; }
        else { Time = (Time * 24).toFixed(2) + " hours ago"; }

        if (time >= 14) { time = (time / 7).toFixed(2) + " weeks ago"; }
        else if (time >=1) { time = time + " days ago"; }
        else { time = (time * 24).toFixed(2) + " hours ago"; }

        const embed = new client.methods.Embed()
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL())
            .setThumbnail(user.avatarURL())
            .setColor(0x04d5fd)
            .setAuthor(`User: ${user.username}`, user.avatarURL())
            .setDescription(`ID: ${user.id}`)
            .addField("Credits:", (row.credits).toLocaleString(), true)
            .addField("Last Daily:", Time, true)
            .addField("Reputation:", row.rep, true)
            .addField("Last Rep:", time, true);
        
        message.channel.send({embed});
    });
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["bal", "credits", "profile"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"],
};
  
exports.help = {
    name: "balance",
    description: "Check credit amount and the last time the user recieved their daily.",
    usage: "[user:str]",
    usageDelim: "",
};