exports.run = async (client, message) => {   
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");

    var color; const reports = [];
    
    const reportTypes = {
        issue: "Issue",
        bug: "Bug", 
        improvement: "Improvement", 
        suggestion: "Suggestion", 
        complaint: "Complaint", 
        todo: "Todo"
    };

    const text = [
        "Alright. Let's get to the point. First question: What kind of issue is this?\nPlease answer `issue`, `bug`, `complaint`, `suggestion`, or `improvement`",
        "Next: Please provide a decently sized message explaining what is wrong."
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
        message.author.dmChannel.awaitMessages(m => m.content, { max: 1, time: 60000, errors: ['time'], }).then((collected) => {
            var type = collected.first().content;
            if (type.toLowerCase() !== reportTypes[type.toLowerCase()].toLowerCase()) { return message.author.send("You have provided me with an invalid type of issue. Please try again with a valid one."); }
            if (reportTypes[type.toLowerCase()] === "Todo" && message.author.id !== client.owner.id) { return message.author.send("You are not able to send todo reports. Only the bot owner can."); }
            else {
                reports.push(reportTypes[type.toLowerCase()]);
                message.author.send(text[1]).then(() => {
                    message.author.dmChannel.awaitMessages(m => m.content, { max: 1, time: 30000, errors: ['time'], }).then((collected) => {
                        reports.push(collected.first().content);
                        db.get(`SELECT * FROM stats WHERE statName = "report"`, [], (err, row) => {
                            if (err) { return console.log(err); }
                            if (!row) { return message.reply("Error in table. Statistic not found in table."); }
                            else {
                                //Report Creation
                                if (reports[0] === "Issue") { color = "#FF0000"; } 
                                else if (reports[0] === "Bug") { color = "#FFFF00"; } 
                                else if (reports[0] === "Improvement" || reports[0] === "Suggestion") { color = "#FFA500"; } 
                                else if (reports[0] === "Complaint") { color = "#DB3E17"; } 
                                else if (reports[0] === "Todo") { color = "#4d5fd"; }

                                embed.setColor(color)
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

/*.setDescription(`Your report has been sent! Report number: ${report}
\nIf you have any more questions, feel free to talk with our support team on my server! It's the best, fastest, and easiest way to get in contact! https://discord.gg/VQ4vrvt`); */    
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
    
exports.help = {
    name: "report",
    description: "File a report to the bot developers. (ie: Bug, issue, complaint)",
    usage: "",
    usageDelim: "",
};
