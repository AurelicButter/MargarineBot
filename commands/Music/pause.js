const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "pause",
			runIn: ["text"],
			description: "Pause the playlist."
		});
	}

	async run(msg) {
		let handler = this.client.util.musicCheck(msg, "handler");
		if (handler === false) {
			return;
		}
		if (handler.state === "PAUSE") {
			return msg.sendLocale("PAUSE_ALREADY", [msg]);
		}

		handler.dispatcher.pause(); //Breaks when the bot hasn't started to play yet. Potentially a musicCheck requirement.
		handler.state = "PAUSE"; //Execute after since bot will not be able to resume if pause() errors
		msg.sendLocale("PAUSE_SUCCESS", [msg]);
	}
};
