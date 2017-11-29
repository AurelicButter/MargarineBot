exports.run = async (client, message, [User, reason]) => {
    let user = client.funcs.userSearch(client, message, User);
    if (user.username === null) { return; }

	let checked = message.channel.permissionsFor(message.author.id).has("BAN_MEMBERS");

    if (checked === false) { 
      const Checkembed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
        .setDescription("You do not have the correct permissions for this command!");
      return message.channel.send({embed: Checkembed});  
    }
    
	if (!reason) { return message.reply("You must supply a reason for the ban."); }
    if (!message.guild.member(user).bannable) { return message.reply("I cannot ban that member"); }
    
    const embed = client.funcs.modEmbed(client, message, "ban", user, message.author, reason);
    
    const DMembed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("Moderator Message:")
        .setDescription(`You have been banned from ${message.guild.name}!\n**Reason:** ${reason}`);

    await user.send({embed: DMembed});
    await message.guild.member(user).ban(reason);
    return await message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["b"],
    permLevel: 3,
    botPerms: ["BAN_MEMBERS", "EMBED_LINKS"],
    requiredFuncs: [],
};
      
exports.help = {
    name: "ban",
    description: "Bans the mentioned user.",
    usage: "<User:str> [reason:str] [...]",
    usageDelim: " ",
};