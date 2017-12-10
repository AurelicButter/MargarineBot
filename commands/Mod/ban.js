exports.run = async (client, message, [User, reason]) => {
    let guild = message.guild;
    let user = client.funcs.userSearch(client, message, User);
    if (user.username === null) { return; }
    
	if (!reason) { return message.reply("You must supply a reason for the ban."); }
    if (!guild.member(user).bannable) { return message.reply("I cannot ban that member"); }
    
    const embed = client.funcs.modEmbed(client, message, "ban", user, reason);
    
    const DMembed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("Moderator Message:")
        .setDescription(`You have been banned from ${guild.name}!\n**Reason:** ${reason}`);

    await user.send({embed: DMembed});
    await guild.member(user).ban(reason);

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
    aliases: ["b"],
    permLevel: 3,
    botPerms: ["BAN_MEMBERS", "EMBED_LINKS"],
    requiredFuncs: ["userSearch", "modEmbed", "confAdd"],
};
      
exports.help = {
    name: "ban",
    description: "Bans the mentioned user.",
    usage: "<User:str> [reason:str] [...]",
    usageDelim: " ",
};