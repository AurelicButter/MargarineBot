exports.run = async (client, message, [User, reason]) => {
    let guild = message.guild;
    let user = client.funcs.userSearch(client, message, User);
    if (user.username === null) { return; }

    if (!reason) { return message.reply("You must supply a reason!"); }
    if (!guild.member(user).kickable) { return message.reply("I cannot kick that member"); }

    const embed = client.funcs.modEmbed(client, message, "kick", user, reason);
    
    const DMembed = new client.methods.Embed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setTitle("Moderator Message:")
      .setDescription(`You have been kicked from ${guild.name}!\n**Reason:** ${reason}`);

    await user.send({embed: DMembed});
    await guild.member(user).kick(reason);
    
    if (embed.title.startsWith(":x:")) { message.channel.send({embed}); } 
    else {
      if ((!client.settings.guilds.schema.modlog) || (!client.settings.guilds.schema.defaultChannel)) { 
        client.funcs.confAdd(client);
        message.channel.send("Whoops! Looks like some settings were missing! I've fixed these issues for you. Please check the confs and set the channel.");
      } if ((guild.settings.defaultChannel !== null) && (guild.settings.modlog === null)) {
        var Channel = guild.channels.find("id", guild.settings.defaultChannel);
        return message.Channel.send({embed});
      } if (guild.settings.modlog !== null) {
        var Channel = guild.channels.find("id", guild.settings.modlog);
        return message.Channel.send({embed});
      } else { return message.channel.send({embed}); }
    }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["k"],
    permLevel: 2,
    botPerms: ["KICK_MEMBERS", "EMBED_LINKS"],
    requiredFuncs: ["modEmbed", "userSearch", "confAdd"],
};
      
exports.help = {
    name: "kick",
    description: "Kicks the mentioned user.",
    usage: "[User:str] [reason:str] [...]",
    usageDelim: " ",
};