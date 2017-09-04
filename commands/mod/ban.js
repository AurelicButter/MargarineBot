exports.run =  async (client, message, [member, ...reason]) => {
    let statement = reason.join(" ");
    let user = message.mentions.users.first();
    let guild = message.guild;
	let checked = message.channel.permissionsFor(message.author.id).has("BAN_MEMBERS");

    if (checked === false) { 
      const Checkembed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
        .setDescription("You do not have the correct permissions for this command!");
      return message.channel.send({embed: Checkembed});  
    }
    
	if (statement.length < 1) { return message.reply("You must supply a reason for the ban."); }

	if (!message.guild.member(user).bannable) { return message.reply("I cannot ban that member"); }

	const embed = new client.methods.Embed()
		.setColor("#FF0000")
		.setTimestamp()
        .setDescription(`**Action:** Banned\n**User:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${statement}`)
        .setThumbnail(user.avatarURL);
    
    const DMembed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("Moderator Message:")
        .setDescription(`You have been bannned from ${guild.name}!\n**Reason:** ${statement}`);

    await user.send({embed: DMembed});
    await message.guild.ban(member);
    return await message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["b"],
    permLevel: 3,
    botPerms: ["BAN_MEMBERS"],
    requiredFuncs: [],
};
      
exports.help = {
    name: "ban",
    description: "Bans the mentioned user.",
    usage: "<mention:user> <reason:str>",
    usageDelim: " ",
};