const { MessageEmbed } = require("discord.js");

/**
 * Creates an embed for a moderation action.
 * @param { KlasaMessage } msg
 * @param { String } action - The action done. Either ban or kick.
 * @param { KlasaUser } user - The user affected by the action.
 * @param { String } reason - The reason behind the action.
 * @returns { {embed: MessageEmbed, DMembed: MessageEmbed} } Returns two embeds in the form of a tuple. First one is for the moderation logs and the second one is for the user involved.
 */
module.exports = function (msg, action = action.toLowerCase(), user, reason) {
	const Options = {
		ban: ["BAN_MEMBERS", msg.language.get("BAN"), 0xdd2e44],
		unban: ["BAN_MEMBERS", msg.language.get("UNBAN"), 0x38b058],
		kick: ["KICK_MEMBERS", msg.language.get("KICK"), 0xffff66],
		mute: ["MANAGE_ROLES", msg.language.get("MUTE"), 0x808080],
		unmute: ["MANAGE_ROLES", msg.language.get("UNMUTE"), 0x38b058],
		warn: ["SEND_MESSAGES", msg.language.get("WARN"), 0x808080],
		rmwarn: ["SEND_MESSAGES", msg.language.get("RMWARN"), 0x808080]
	};

	const embed = new MessageEmbed().setTimestamp();
	let options = Options[action];
	
	if (msg.channel.permissionsFor(msg.author).has(options[0]) === false) {
		embed
			.setColor(0xdd2e44)
			.setTitle(msg.language.get("MISSINGPERMISSION"))
			.setDescription(msg.language.get("USER_INCORRECTPERM"));
	} else if (msg.channel.permissionsFor(msg.client.user).has(options[0]) === false) {
		embed
			.setColor(0xdd2e44)
			.setTitle(msg.language.get("MISSINGPERMISSION"))
			.setDescription(msg.language.get("MARG_INCORRECTPERM"));
	} else {
		embed
			.setColor(options[2])
			.setTitle(`**${msg.language.get("USER")} ${msg.client.util.toTitleCase(options[1])}!**`)
			.setDescription(reason)
			.addField(`**${msg.language.get("MODR")}:**`, msg.language.get("MODEMBED_USERFIELD", msg.author.tag, msg.author.id))
			.addField(`**${msg.language.get("USER")}:**`, msg.language.get("MODEMBED_USERFIELD", user.user.tag, user.user.id))
			.setThumbnail(msg.author.displayAvatarURL());
	}

	const DMembed = new MessageEmbed()
		.setColor(options[2])
		.setTitle(msg.language.get("MODEMBED_MESSAGEHEADER"))
		.setDescription(msg.language.get("MODEMBED_DMMESSAGE", options[1].toLowerCase(), msg.guild.name, reason));

	return { embed, DMembed };
};
