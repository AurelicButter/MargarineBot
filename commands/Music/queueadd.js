const { Command } = require("klasa");
const { getBasicInfo } = require("ytdl-core");
const ytfps = require("ytfps");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "queueadd",
			runIn: ["text"],
			description: "Adds a song or a playlist to the queue.",
			usage: "[song:str]",
			extendedHelp: "Note: Only Youtube song and Youtube playlist URLs only. Youtube mixes do not count."
		});
	}

	async run(msg, [song]) {
		let handler = this.client.util.musicCheck(msg);
		if (handler === false) {
			return;
		}

		if (song.match(/(playlist\?list=\S{30,34})/)) {
			// Handle playlists
			msg.sendLocale("QUEUEADD_LISTDETECT", [msg]);
			let list = await ytfps(song.split("?list=")[1]);
			list = list.videos;

			for (let x = 0; x < list.length; x++) {
				handler.queue.push({
					url: list[x].url,
					title: list[x].title,
					seconds: list[x].milis_length / 1000,
					requester: msg.author.tag
				});
			}

			return msg.sendLocale("QUEUEADD_MULTI", [msg, list.length]);
		}

		if (song.match(/(?:v=)(\S{11})/)) {
			// Handle single videos
			let id = song.match(/(?:v=)(\S{11})/)[1];
			let info;
			try {
				info = await getBasicInfo(`https://youtu.be/${id}`);

				handler.queue.push({
					url: info.videoDetails.video_url,
					title: info.videoDetails.title,
					seconds: info.videoDetails.lengthSeconds,
					requester: msg.author.tag
				});
			} catch (err) {
				return msg.sendLocale("QUEUEADD_ERRCATCH", [msg, id]);
			}

			return msg.sendLocale("QUEUEADD_SUCCESS", [msg, info.videoDetails.title]);
		}

		msg.sendLocale("QUEUEADD_NOURL", [msg]);
	}
};
