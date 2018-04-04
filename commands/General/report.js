const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./assets/data/score.sqlite");
const reportChannel = require("../../assets/settings.json").owner.channels.report;

exports.run = async (client, msg) => {   
    const reports = [];
    
    const reportTypes = {
        issue: ["Issue", 0xFF0000],
        bug: ["Bug", 0xFFFF00],
        improvement: ["Improvement", 0xFFA500],
        suggestion: ["Suggestion", 0xFFA500],
        complaint: ["Complaint", 0xDB3E17],
        todo: ["Todo", 0x04d5fd]
    };

    const text = [
        "Alright. Let's get to the point. First question: What kind of issue is this?\nPlease answer `issue`, `bug`, `complaint`, `suggestion`, or `improvement`",
        "Next: Please provide a decently sized message explaining the item."
    ];

    const issue = [
        "It seems you have timed out with making a report. When you are ready, feel free to try again!",
        "You didn't provide me with a description in time. I recommend either making your report shorter or copy and pasting so that you don't have to try and type it so quickly."
    ];

    await msg.reply("I'm going to be asking a couple of questions so I'll be taking this into the DMs.");
    await msg.author.send(text[0]).then(() => {
        msg.author.dmChannel.awaitMessages(m => m.content, { max: 1, time: 160000, errors: ["time"], }).then((collected) => {
            var type = collected.first().content;
            if (type.toLowerCase() !== reportTypes[type.toLowerCase()][0].toLowerCase()) { return msg.author.send("You have provided me with an invalid type of issue. Please try again with a valid one."); }
            if (reportTypes[type.toLowerCase()][0] === "Todo" && msg.author.id !== client.owner.id) { return msg.author.send("You are not able to send todo reports. Only the bot owner can."); }
            
            reports.push(reportTypes[type.toLowerCase()]);
            msg.author.send(text[1]).then(() => {
                msg.author.dmChannel.awaitMessages(m => m.content, { max: 1, time: 130000, errors: ["time"], }).then((collected) => {
                    reports.push(collected.first().content);
                    db.get("SELECT reportNumber FROM stats WHERE statName = 'general'", [], (err, row) => {
                        if (err) { return console.log(err); }
                        
                        const embed = new client.methods.Embed()
                            .setTimestamp()
                            .setColor(reports[0][1])
                            .setTitle(`${reports[0][0]} Report: ${row.reportNumber}`)
                            .setDescription(reports[1])
                            .setFooter(`Reported by: ${msg.author.tag} from ${msg.channel.guild.name}`, msg.author.displayAvatarURL());
    
                        const DMembed = new client.methods.Embed()
                            .setColor(0x00AE86)
                            .setTimestamp()
                            .setDescription(`**Report number:** ${row.reportNumber} \n**Issue:** ${reports[1]} 
                            \nYour report has been sent! Any more questions, please ask Butterstroke#7150!`);
   
                        db.run(`UPDATE stats SET reportNumber = ${row.reportNumber + 1} WHERE statName ="general"`); 
                        client.channels.get(reportChannel).send({embed});
                        msg.author.send({embed: DMembed});       
                    });
                    db.close();
                }).catch(() => { msg.author.send(issue[1]); }); 
            });
        }).catch(() => { msg.author.send(issue[0]); }); 
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
    name: "report",
    description: "File a report to the bot developer. (ie: Bug, issue, complaint)",
    usage: "",
    extendedHelp: "Margarine will be sliding into your DMs for a few questions. Be sure to have DMs open and ready to answer some questions!"
};