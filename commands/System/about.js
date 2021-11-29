const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const { serverLink } = require("../../assets/settings.json");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "about",
			runIn: ["text", "dm"],
			aliases: ["stats", "whoami"],
			guarded: true,
			description: "General information"
		});
	}

	async run(msg) {
		let support = serverLink && serverLink.length > 1 ? `| [Support Server](${serverLink})` : "";

		const embed = new MessageEmbed()
			.setColor(0x37fdfc)
			.setTitle("About Me")
			.setDescription(
				`[Github](https://github.com/Butterstroke/MargarineBot) | [Terms Of Service](https://github.com/Butterstroke/MargarineBot/wiki/Terms-of-Service) ${support}
        \nI am a very helpful and amazing bot! Doing ${
			msg.guild.settings.prefix
		}help is great for finding ways I can assist you. I was written with Discord.js and Klasa, a Discord.js framework.
        \n**Stats:** I have been online, helping out, for ${this.client.util.timekeeper.elapsedTime(
			this.client.uptime
		)} using ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB of memory. ${
					this.client.users.cache.size
				} users across ${
					this.client.guilds.cache.size
				} guilds with ${this.client.channels.cache.size.toLocaleString()} channels depend on my functions to be as reliable as possible!
        \n**Name Origin:** Butterstroke#7150's typical nickname is Butter. As in the stuff that you put on toast. My name comes from the artificial butter *(He tends to call it 'Fake Butter')* you can buy in stores called, Margarine.        
        \n**Creation:** I was created on ${this.client.util.timekeeper.dateMaker(
			this.client.user.createdAt
		)} by Butterstroke#7150.`
			)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(
				`Running on Margarine ${this.client.build.version} | Released on: ${this.client.build.releaseDate}`
			);

		msg.channel.send({ embed });
	}
};
