const fs = require("fs");

exports.run = async (client, message, [type, args]) => {    
    let records = JSON.parse(fs.readFileSync("records.json", "utf8"));
    let settings = require("../../settings.json");
    const types = ["issue", "bug", "improvement", "complaint"];
    let Type = type.toLowerCase();
    let user = message.author;
    let guild = message.guild;
    let report = records[settings.ownerID];

    if (!args) { return message.reply("Your report failed to include a message! Nothing gets done without an explaination!"); }
    
    if (types.some(word => types.includes(Type))) {
        if (Type == types[0]) { 
            color = "#FF0000"; 
            Type = "Issue";
        }
        if (Type == types[1]) { 
            color = "#FFFF00";
            Type = "Bug";
        }
        if (Type == types[2]) { 
            color = "#FFA500";
            Type = "Improvement";
        }
        if (Type == types[3]) { 
            color = "#DB3E17";
            Type = "Complaint"; 
        }
    } else { 
        return message.reply("You provided a false value. Please use either `issue`, `bug`, `improvement`, `complaint` as a type!");
    }

    const embed = new client.methods.Embed()
		.setColor(color)
        .setTimestamp()
        .setTitle(`${Type} Report: ${report.report}`)
        .setDescription(`A user has filed a report!`)
        .addField(`User: ${user.tag}`, `From: ${guild.name}`)
        .addField(`Message: `, `${args}`)
        .setThumbnail(user.avatarURL);
    
    const DMembed = new client.methods.Embed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setTitle("Report confirmation:")
      .setDescription(`Your report has been sent! Report number: ${report.report}
      \nIf you have any more questions, feel free to talk with our support team on my server! It's the best, fastest, and easiest way to get in contact! https://discord.gg/VQ4vrvt`);

    await report.report++;
    await client.users.get(user.id).send({embed: DMembed});
    await message.reply("Report filed! A DM has been sent for your report number and the support team has recived your report.");
    await client.channels.get("353381124250140682").send({embed});
    return await fs.writeFile("records.json", JSON.stringify(records), (err) => { if (err) { console.error(err)} });
};
  
exports.conf = {
      enabled: true,
      runIn: ["text"],
      aliases: ["issue"],
      permLevel: 0,
      botPerms: [],
      requiredFuncs: [],
};
    
exports.help = {
      name: "report",
      description: "File a report to the bot developers about Margarine. (ie: Bug, issue, complaint)",
      usage: "<type:str> <args:str>",
      usageDelim: " ",
};