exports.run = async (client, message) => {   
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

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
        "You didn't provide me with a description in time."
    ];

    const embed = new client.methods.Embed()
    .setTimestamp()
    .setDescription("A user has filed a report!")
    .setThumbnail(message.author.avatarURL());

    const DMembed = new client.methods.Embed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setTitle("Report confirmation:");

    await message.reply("I'm going to be asking a couple of questions so I'll be taking this into the DMs.");
    await message.author.send(text[0]).then(() => {
        message.author.dmChannel.awaitMessages(m => m.content, { max: 1, time: 160000, errors: ["time"], }).then((collected) => {
            var type = collected.first().content;
            if (type.toLowerCase() !== reportTypes[type.toLowerCase()][0].toLowerCase()) { return message.author.send("You have provided me with an invalid type of issue. Please try again with a valid one."); }
            if (reportTypes[type.toLowerCase()][0] === "Todo" && message.author.id !== client.owner.id) { return message.author.send("You are not able to send todo reports. Only the bot owner can."); }
            else {
                reports.push(reportTypes[type.toLowerCase()]);
                message.author.send(text[1]).then(() => {
                    message.author.dmChannel.awaitMessages(m => m.content, { max: 1, time: 130000, errors: ["time"], }).then((collected) => {
                        reports.push(collected.first().content);
                        db.get("SELECT * FROM stats WHERE statName = 'report'", [], (err, row) => {
                            if (err) { return console.log(err); }
                            else {
                                embed.setColor(reportTypes[type.toLowerCase()][1])
                                .setTitle(`${reports[0]} Report: ${row.reportNumber}`)
                                .addField(`User: ${message.author.tag}`, `From: ${message.guild.name}`)
                                .addField("Message:", `${reports[1]}`);
    
                                DMembed.setDescription(`Your report has been sent! Report number: ${row.reportNumber}
                                \nIssue: ${reports[1]} \nAny more questions, please ask Butterstroke#7150!`);
   
                                db.run(`UPDATE stats SET reportNumber = ${row.reportNumber + 1} WHERE statName = "report"`); 
                                client.channels.get("353381124250140682").send({embed});
                                message.author.send({embed: DMembed});       
                            }
                        });
                        db.close();
                    }).catch(() => { message.author.send(issue[1]); }); 
                }); 
            }
        }).catch(() => { message.author.send(issue[0]); }); 
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
    usageDelim: "",
    extendedHelp: "Margarine will be sliding into your DMs for a few questions. Be sure to have DMs open and ready to answer some questions!"
};