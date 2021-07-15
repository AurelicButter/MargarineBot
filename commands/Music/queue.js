const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const { duration } = require("moment");
require("moment-duration-format");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "queue",
			runIn: ["text"],
			requiredPermissions: ["EMBED_LINKS"],
			description: "Displays the music queue.",
			usage: "[page:int]"
		});
	}

	async run(msg, [page = 1]) {
		const handler = this.client.music.get(msg.guild.id);
		if (!handler) {
			throw msg.sendLocale("MUSICCHECK_NOQUEUE");
		}
		if (handler.queue.length < 1) {
			throw msg.sendLocale("QUEUE_NOQUEUE", [msg]);
		}

		let count;
		if (page.length < 1 || page === 1) {
			page = 1;
			count = 0;
		} else {
			count = 10 * (page - 1);
		}

		if (handler.queue.length < count) {
			return msg.sendLocale("QUEUE_HIGHCOUNT", [msg, Math.ceil(handler.queue.length / 10)]);
		}

		const embed = new MessageEmbed()
			.setColor(0x04d5fd)
			.setTitle(`📻 __${msg.guild.name}'s Stream of Music__`)
			.setDescription(
				`Currently streaming ${handler.queue.length} ${handler.queue.length === 1 ? "song" : "songs"}.`
			)
			.setThumbnail(msg.guild.iconURL())
			.setFooter(`Page: ${page} of ${Math.ceil(handler.queue.length / 10)}`);

		for (let i = count; i < Math.min(handler.queue.length, count + 10); i++) {
			embed.addField(
				`${i + 1}) ${handler.queue[i].title}`,
				`Requested by: ${handler.queue[i].requester} - Run time: ${duration(
					handler.queue[i].seconds * 1000
				).format("h:mm:ss", { trim: false })}`
			);
		}

		msg.channel.send({ embed });
	}
};
