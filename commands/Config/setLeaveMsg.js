const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "setleave",
			enabled: true,
			runIn: ["text"],
			description: "Set a leave message for when users leave the server.",
			usage: "[show|remove|text:str]",
			permissionLevel: 5,
			extendedHelp: "Add `-pinguser`, `-username`, `-userid`, and/or `-servername` to the message to have Margarine personalize it. Standard Discord styling still applies.\n\n" +
                "This feature requires both a message and a default channel set. Removing either one will disable this feature."
		});
	}

	async run(msg, [item]) {
		if (item === "show" || item === undefined) {
			return msg.channel.send(
				msg.guild.settings.leaveMsg.replace("-pinguser", `<@!${msg.author.id}>`)
					.replace("-servername", msg.guild.name)
					.replace("-userid", msg.author.id)
					.replace("-username", msg.author.username)
			);
		}

		if (item === "remove") {
			msg.guild.settings.update("leaveMsg", null).then(() => {
                msg.sendLocale("REMOVELEAVE", [msg]);
            });
            return;
		}

		msg.guild.settings.update("leaveMsg", item).then(() => {
			msg.sendLocale("SETLEAVE", [msg, item]);
		});
	}
};
