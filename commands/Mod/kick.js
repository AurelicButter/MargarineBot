exports.run = async (client, msg, [user, reason]) => {
	user = await client.funcs.userSearch(client, msg, user);
	if (user === false) { return; }

	if (!reason) { return msg.reply("You must supply a reason!"); }
	if (user.kickable === false) { return msg.reply("I cannot kick that member"); }

	var data = await client.funcs.modEmbed(msg, "kick", user, reason);
	
	if (data.embed.thumbnail) {
		await user.send({embed: data.DMembed});
		await user.kick(reason);
	}

	var channel = client.funcs.defaultChannel(client, msg.guild, "mod");
	await channel.send({embed: data.embed});
};

exports.conf = {
  	enabled: true,
  	runIn: ["text"],
  	aliases: ["k"], permLevel: 2,
  	botPerms: ["KICK_MEMBERS", "EMBED_LINKS"],
  	requiredFuncs: ["modEmbed", "userSearch"]
};
      
exports.help = {
  	name: "kick",
  	description: "Kicks the mentioned user.",
	usage: "[user:str] [reason:str]", usageDelim: "|",
	humanUse: "[user] [reason]"
};