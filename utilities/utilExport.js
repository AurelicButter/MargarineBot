const { existsSync, unlinkSync, rmdirSync, readdirSync } = require("fs");
const { version: djsVersion } = require("discord.js");
const { version: kVersion } = require("klasa");
const { dateOptions } = require("../assets/settings.json");
/* Exports all needed utilities for the client. */

exports.speech = require("./speechHelper.js");
exports.dataManager = require("./dataManager.js");
exports.schemaManager = require("./schemaManager.js");

/** Removes any unnessesscary commands in the default Klasa framework.
 */
exports.commandRemover = function () {
	const cmdNames = ["Admin/load", "Admin/unload", "Admin/transfer", "Admin/reboot"];
	const GeneralPath = `${process.cwd()}/node_modules/klasa/src/commands/General`;
	if (existsSync(GeneralPath)) {
		readdirSync(GeneralPath).forEach((file) => {
			unlinkSync(`${GeneralPath}/${file}`);
		});

		rmdirSync(GeneralPath);
	}

	for (let x = 0; x < cmdNames.length; x++) {
		if (existsSync(`${process.cwd()}/node_modules/klasa/src/commands/${cmdNames[x]}.js`)) {
			unlinkSync(`${process.cwd()}/node_modules/klasa/src/commands/${cmdNames[x]}.js`);
		}
	}
};

/**
 * Verifies the enviroment before running Margarine.
 * If the enviroment check fails, program will terminate
 * @returns { null }  If enviroment check passes.
 */
exports.envCheck = function () {
	let missingDep = [];

	let djsVer = djsVersion.split(".");
	djsVer = Number(`${djsVer[0]}.${djsVer[1]}`);

	if (djsVer < 12.3) {
		missingDep.push("You are not using the right discord.js package! Required version: v12.3.0+");
	}
	if (kVersion !== "0.5.0") {
		missingDep.push("You are not using the right Klasa version! Required version: v0.5.0");
	}

	if (missingDep.length > 0) {
		console.log(missingDep.join("\n"));
		process.exit();
	}
};

exports.util = {
	timekeeper: require("./timekeeper.js"),
	presenceHelper: require("./presenceHelper.js"),
	modEmbed: require("./modEmbed.js"),
	/**
	 * Returns the best matching channel for channel messages.
	 * @param { KlasaGuild } guild - Needed to search for the channel and settings.
	 * @param { String } [args] - Defaults to "default". Takes either "default" or "mod" depending on the action needed.
	 * @returns { KlasaChannel } Returns a channel that best fits the arguements given.
	 */
	defaultChannel: (guild, args = "default") => {
		if (guild.settings.defaultChannel !== null && args === "default") {
			return guild.channels.cache.get(guild.settings.defaultChannel);
		} else if (guild.settings.modlog !== null && args === "mod") {
			return guild.channels.cache.get(guild.settings.modlog);
		}

		let name = ["general", "general-chat", "off-topic"];
		let channelID = Array.from(guild.channels.cache).filter(
			(channel) => name.includes(channel[1].name) && channel[1].type === "text"
		);
		if (channelID.length > 0) {
			return channelID[0][1];
		}

		let channels = Array.from(guild.channels.cache.sort((e1, e2) => e1.rawPosition - e2.rawPosition));
		for (let x = 0; x < channels.length; x++) {
			let currChannel = channels[x][1];
			if (
				currChannel.type === "text" &&
				currChannel.permissionsFor(guild.members.cache.get(this.client.user.id)).has("SEND_MESSAGES")
			) {
				channelID = currChannel;
				x = channels.length;
			}
		}

		return guild.channels.cache.get(channelID.id);
	},
	/**
	 * Goes over all common checks to ensure the user is able to interact with a music command
	 * @param { KlasaMessage } msg
	 * @param { String } tag - A tag for specific cases such as the join command.
	 * @returns { Boolean | Object } Returns true if passed and false if failed. If tag is not join, will return the music instance.
	 */
	musicCheck: (msg, tag) => {
		if (!msg.member.voice.channelID) {
			msg.sendLocale("MUSICCHECK_USERNOVC");
			return false;
		} 
		
		if (tag !== "join") {
			let handler = msg.client.music.get(msg.guild.id);
			if (!handler) {
				msg.sendLocale("MUSICCHECK_NOQUEUE");
				return false;
			} else if (msg.member.voice.channelID !== handler.channel.id) {
				msg.sendLocale("MUSICCHECK_MISMATCHVC");
				return false;
			} else if (tag === "handler" && !handler.dispatcher) {
				msg.sendLocale("MUSICCHECK_NOHANDLER");
			}

			return handler;
		}

		return true;
	},
	/**
	 * Returns a capitialized text string
	 * @param { String } text
	 * @return { String }
	 */
	toTitleCase: (text) => {
		return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
	},
	/**
	 * Generate a Date display for printing
	 * @param { Date } date
	 * @return { String }
	 */
	dateDisplay: (date) => {
		return date.toLocaleString(dateOptions.lang, dateOptions.display);
	},
	/**
	 * Generate a random number
	 * @param { Number } min - The minimum value. Is included in the possible range.
	 * @param { Number } max - The maximum value. Will be excluded in the randomness.
	 * @return { Number }
	 */
	getRandom: (min, max) => {
		return Math.floor(Math.random() * (max - min)) + min;
	}
};
