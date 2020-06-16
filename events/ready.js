const { Event, KlasaUser } = require("klasa");
const { Collection } = require("discord.js");
const { secondary } = require("../assets/settings.json");

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

		//Figure out and apply level 10 permission to application owner and level 9 permission to any listed
		//Secondary accounts or team members (if owner is team based)
		var botApp = this.client.application.owner;

		if (botApp instanceof KlasaUser) { 
			this.client.owner = botApp; 
			this.client.secondary = secondary;
		} else { 
			this.client.owner = botApp.owner.user;
			this.client.secondary = [];

			botApp.members.each(user => {
				this.client.secondary.push(user.id);
			});
		}
	}
};