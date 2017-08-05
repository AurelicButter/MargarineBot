const Discord = require("discord.js");

exports.run = (client, message, args) => {
	let reason = args.slice(1).join(" ");
	let user = message.mentions.users.first();
	let modlog = client.channels.find("name", "centraloffice")
	if (!modlog) { return message.reply("I cannot find the central office!"); }
	if (reason.length < 1) { return message.reply("You must supply a reason for the ban."); }
	if (message.mentions.users.size < 1) { return message.reply("You must mention someone to ban them.").catch(console.error); }

	if (!message.guild.member(user).bannable) { return message.reply("I cannot ban that member"); }
	message.guild.ban(user, 2);

	const embed = new Discord.RichEmbed()
		.setColor("#FF0000")
		.setTimestamp()
        	.setDescription(`**Action:** Banned\n**User:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        	.setThumbnail(user.avatarURL);
    	return client.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["ban", "b"],
	permLevel: 2
};

exports.help = {
	name: "Ban",
	description: "Bans the mentioned user.",
	usage: "ban <mention user> <reason>"
};
