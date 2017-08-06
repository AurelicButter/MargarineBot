const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let reason = args.slice(1).join(" ");
    let user = message.mentions.users.first();
    let modlog = client.channels.find("name", "centraloffice");
    let muteRole = client.guilds.get(message.guild.id).roles.find("name", "Muted");
  
    if (!modlog) { return message.reply("I cannot find a mod-log channel").catch(console.error); }
    if (!muteRole) { return message.reply("I cannot find a mute role").catch(console.error); }
    if (reason.length < 1) { return message.reply("You must supply a reason for the mute.").catch(console.error); }
    if (message.mentions.users.size < 1) { return message.reply("You must mention someone to mute them.").catch(console.error); }
    
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .addField("Action:", "Un/Mute")
        .addField("User:", `${user.username}#${user.discriminator}`)
        .addField("Moderator:", `${message.author.username}#${message.author.discriminator}`)
        .addField("Reason:", reason);

    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) { return message.reply("I do not have the correct permissions.").catch(console.error); }

    if (message.guild.member(user).roles.has(muteRole.id)) {
        message.guild.member(user).removeRole(muteRole).then(() => {
        client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
        });
    } else {
        message.guild.member(user).addRole(muteRole).then(() => {
        client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
        });
    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute"],
  permLevel: 2
};

exports.help = {
  name: "Mute",
  description: "Mutes or Unmutes user.",
  usage: "un/mute <mention> <reason>"
};
