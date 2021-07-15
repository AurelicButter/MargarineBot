const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "resume",
			runIn: ["text"],
			description: "Resumes the playlist."
		});
	}

	async run(msg) {
		let handler = this.client.util.musicCheck(msg, "handler");
		if (handler === false) {
			return;
		}
		if (handler.state !== "PAUSE") {
			return msg.sendLocale("RESUME_NOPAUSE", [msg]);
		}

		handler.dispatcher.resume();
		handler.state = "PLAY";
		msg.sendLocale("RESUME_SUCCESS", [msg]);
	}
};
