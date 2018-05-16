exports.run = async (client, msg, [user]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    var data = await client.funcs.userSearch(msg, {user: [user], tags:["bot"], name: this.help.name});
    if (data.valid === false) { return; }

    db.get(`SELECT * FROM scores WHERE userId = "${data.user[0].id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return msg.reply("That person hasn't signed up with `m~daily` yet! D:"); } 

        let time = [((Date.now() - row.daily) / 86400000), ((Date.now() - row.repDaily) / 86400000)];
        for (var x = 0; x < 2; x++) {
            if (time[x] >= 14) { time.push((time[x]/7).toFixed(2) + " weeks"); }
            else if (time[x] >= 1) { time.push(time[x].toFixed(2) + " days"); }
            else { time.push((time[0] * 24).toFixed(2) + " hours"); }
        }
        
        client.users.fetch(data.user[0].id).then(avatar => {
            const embed = new client.methods.Embed()
                .setTimestamp()
                .setFooter(msg.guild.name, msg.guild.iconURL())
                .setThumbnail(avatar.displayAvatarURL())
                .setColor(0x04d5fd)
                .setAuthor(`User: ${data.user[0].username}`, avatar.displayAvatarURL())
                .setDescription(`ID: ${data.user[0].id}`)
                .addField("Credits:", (row.credits).toLocaleString() + " (Last redeem: " + time[2] + " ago)")
                .addField("Reputation:", row.rep + " (Last Rep: " + time[3] + " ago)");
        
            msg.channel.send({embed});
        });
    });
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["bal", "credits", "profile"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"]
};
  
exports.help = {
    name: "balance",
    description: "Check credit amount and the last time the user recieved their daily.",
    usage: "[user:str]",
    humanUse: "(user)"
};