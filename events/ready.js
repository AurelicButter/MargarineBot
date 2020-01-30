const { Event } = require("klasa");
const { Collection } = require("discord.js");

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			once: true,
			event: "klasaReady"
		});
	}

	async run() {
		this.client.util.presenceHelper(this.client, "-start"); //Initialize presence
		this.client.settings.usedDaily = new Collection(); //A collection to store a tuple with a userID and a timestamp.
	}
};