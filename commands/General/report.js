exports.run = async (client, msg) => {   
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database(client.database.general);
    
    const reportTypes = {
        issue: ["Issue", 0xFF0000],
        bug: ["Bug", 0xFFFF00],
        suggestion: ["Suggestion", 0xFFA500],
        complaint: ["Complaint", 0xDB3E17],
        todo: ["Todo", 0x04d5fd]
    };

    const filter = m => Object.keys(reportTypes).includes(m.content.toLowerCase());

    await msg.reply(client.speech(msg, ["report", "start"]));
    await msg.author.send(client.speech(msg, ["report", "q1"])).then(() => {
        msg.author.dmChannel.awaitMessages(filter, { max: 1, time: 160000, errors: ["time"], }).then((collected) => {
            var type = collected.first().content.toLowerCase();
            if (type === "todo" && msg.author.id !== client.owner.id) { return msg.author.send(client.speech(msg, ["report", "err1"])); }

            type = reportTypes[type];
            msg.author.send(client.speech(msg, ["report", "q2"])).then(() => {
                msg.author.dmChannel.awaitMessages(m => m.content, { max: 1, time: 130000, errors: ["time"], }).then((desc) => {
                    db.get("SELECT reportNumber FROM stats WHERE statName = 'report'", [], (err, row) => {
                        if (err) { return console.log(err); }
                        
                        const embed = new client.methods.Embed()
                            .setTimestamp()
                            .setColor(type[0][1])
                            .setTitle(`${type[0][0]} Report: ${row.reportNumber}`)
                            .setDescription(desc.first().content)
                            .setFooter(`Reported by: ${msg.author.tag} from ${msg.channel.guild.name}`, msg.author.displayAvatarURL());
    
                        const DMembed = new client.methods.Embed()
                            .setColor(0x00AE86)
                            .setTimestamp()
                            .setDescription(`**Report number:** ${row.reportNumber} \n**Issue:** ${desc.first().content} 
                            \nYour report has been sent! Any more questions, please ask ${client.owner.tag}!`);
   
                        db.run(`UPDATE stats SET reportNumber = ${row.reportNumber + 1} WHERE statName ="report"`); 
                        client.channels.get(client.ownerSetting.get("channels").report).send({embed});
                        msg.author.send({embed: DMembed});       
                    });
                    db.close();
                }).catch(() => { msg.author.send(client.speech(msg, ["report", "timeout", "t2"])); }); 
            });
        }).catch(() => { msg.author.send(client.speech(msg, ["report", "timeout", "t1"])); }); 
    });
};  
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
    
exports.help = {
    name: "report",
    description: "File a report to the bot developer. (ie: Bug, issue, complaint)", usage: "",
    extendedHelp: "Margarine will be sliding into your DMs for a few questions. Be sure to have DMs open and ready to answer some questions!"
};