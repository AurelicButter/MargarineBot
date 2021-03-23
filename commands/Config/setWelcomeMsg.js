const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "setwelcome",
			enabled: true,
			runIn: ["text"],
			description: "Set a welcome message for new guild members to see when they join!",
			usage: "[remove|text:str]",
			permissionLevel: 6,
			extendedHelp: "Add `-pinguser`, `-username`, `-userid`, and/or `-servername` to the message to have Margarine personalize it! Standard Discord styling still applies.\n\n" +
                "This feature requires both a message and a default channel set. Removing either one will disable this feature."
		});
	}

	async run(msg, [item]) {
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
