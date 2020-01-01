const { Event } = require('klasa');

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			once: true,
			event: 'klasaReady'
		});
	}

	async run() {
        this.client.util.presenceHelper(this.client, "-start"); //Initialize presence
	}
};