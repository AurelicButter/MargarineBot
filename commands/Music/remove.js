const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "remove",
			runIn: ["text"],
			description: "Removes a song from the queue.",
			usage: "[songID:int]"
		});
	}

	async run(msg, [songID = 0]) {
		let handler = this.client.util.musicCheck(msg);
		if (handler === false) {
			return;
		}
		if (songID === 0 && handler.state === "PLAY") {
			return this.client.commands.get("skip").run(msg);
		}

		songID = songID - 1;
		if (handler.queue.length < songID) {
			return msg.sendLocale("REMOVE_HIGHINDEX", [msg, handler.queue.length]);
		}

		if (songID < 0) {
			songID = 0;
		}

		let title = handler.queue[songID].title;
		handler.queue.splice(songID, 1);
		msg.sendLocale("REMOVEMUSIC", [msg, title]);
	}
};
