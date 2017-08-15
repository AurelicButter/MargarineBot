const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let reason = args.slice(1).join(" ");
    let user = message.mentions.users.first();
    let modlog = client.channels.find("name", "centraloffice");
    
    if (!modlog) { return message.reply("I cannot find the Central Office."); }
    if (reason.length < 1) { return message.reply("You must supply a reason for the warning."); }
    if (message.mentions.users.size < 1) { return message.reply("You must mention someone to warn them.").catch(console.error); }

    const embed = new Discord.RichEmbed()
        .setColor("#ffff00")
        .setTimestamp()
        .setDescription(`**Action:** Warning\n**User:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        .setThumbnail(user.avatarURL);
    return client.channels.get(modlog.id).sendEmbed(embed);
	};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["w", "warn"],
  permLevel: 2
};

exports.help = {
  name: "Warn",
  description: "Issues a warning to the mentioned user.",
  usage: "warn <mention>"
};
