const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "skip",
			runIn: ["text"],
			description: "Skips the current song."
		});
	}

	async run(msg) {
		let handler = this.client.util.musicCheck(msg, "handler");
		if (handler === false) {
			return;
		}

		handler.dispatcher.end();
		msg.sendLocale("SKIPMUSIC", [msg]);
	}
};
