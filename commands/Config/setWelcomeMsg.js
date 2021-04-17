const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "setwelcome",
			enabled: true,
			runIn: ["text"],
			description: "Set a welcome message for new users to see when they join!",
			usage: "[show|remove|text:str]",
			permissionLevel: 5,
			extendedHelp: "Add `-pinguser`, `-username`, `-userid`, and/or `-servername` to the message to have Margarine personalize it! Standard Discord styling still applies.\n\n" +
                "This feature requires both a message and a default channel set. Removing either one will disable this feature."
		});

		this.humanUse = "[show|remove|(welcome message)]";
	}

	async run(msg, [item]) {
		if (item === "show" || item === undefined) {
			return msg.channel.send(
				msg.guild.settings.welcomeMsg.replace("-pinguser", `<@!${msg.author.id}>`)
					.replace("-servername", msg.guild.name)
					.replace("-userid", msg.author.id)
					.replace("-username", msg.author.username)
			);
		}

		if (item === "remove") {
            msg.guild.settings.update("welcomeMsg", null).then(() => {
                msg.sendLocale("REMOVEWELCOME", [msg]);
            });
            return;
		}

		msg.guild.settings.update("welcomeMsg", item).then(() => {
			msg.sendLocale("SETWELCOME", [msg, item]);
		});
	}
};
