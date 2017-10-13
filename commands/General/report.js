const fs = require("fs");

exports.run = async (client, message, [option, Message]) => {    
    let records = JSON.parse(fs.readFileSync("records.json", "utf8"));
    let settings = require("../../settings.json");
    let type = option.toLowerCase();
    let user = message.author;
    let report = records[settings.ownerID].report;
    let color = null; let Type = null;

    if (!Message) { return message.reply("Your report failed to include a message! Nothing gets done without an explaination!"); }
    if (type === "todo" && message.author.id !== settings.ownerID) { return message.reply("I'm sorry only the bot owner can add things to the todo list."); }

    if (type === "issue") { 
        color = "#FF0000"; 
        Type = "Issue";
    } else if (type === "bug") { 
        color = "#FFFF00";
        Type = "Bug";
    } else if (type === "improvement") { 
        color = "#FFA500";
        Type = "Improvement";
    } else if (type === "complaint") { 
        color = "#DB3E17";
        Type = "Complaint"; 
    } else if (type === "todo") {
        color = "#4d5fd";
        Type = "Todo";
    } else { 
        return message.reply("You provided a false value. Please use either `issue`, `bug`, `improvement`, `complaint` as a type!");
    }

    const embed = new client.methods.Embed()
	.setColor(color)
        .setTimestamp()
        .setTitle(`${Type} Report: ${report}`)
        .setDescription("A user has filed a report!")
        .addField(`User: ${user.tag}`, `From: ${message.guild.name}`)
        .addField("Message:", `${Message}`)
        .setThumbnail(user.avatarURL());
    
    const DMembed = new client.methods.Embed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setTitle("Report confirmation:")
      .setDescription(`Your report has been sent! Report number: ${report}
      \nIssue: ${Message}
      \nAny more questions, please ask Butterstroke#7150!`);

    await records[settings.ownerID].report++;
    await message.delete().catch();
    await client.users.get(user.id).send({embed: DMembed});
    await client.channels.get("353381124250140682").send({embed});
    await fs.writeFile("records.json", JSON.stringify(records), (err) => {
        if (err) { 
            console.error(err);
            return message.reply("There has been an error upon processing the report. I have sent an error log to the developers to fix. Please try reporting at a later time.");
        } 
    });
    return await message.reply("Report sent! A DM has been sent with your report number.");
};
  
exports.conf = {
      enabled: true,
      runIn: ["text"],
      aliases: ["issue"],
      permLevel: 0,
      botPerms: [],
      requiredFuncs: [],
      cooldown: 300,
};
    
exports.help = {
      name: "report",
      description: "File a report to the bot developers about Margarine. (ie: Bug, issue, complaint)",
      usage: "<option:str> [Message:str]",
      usageDelim: " | ",
};
