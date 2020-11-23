const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {
    constructor(...args) {
        super(...args, {
            name: "nsfw",
            enabled: true
        });
    }

	run(msg, command) {
		if (command.nsfw && !msg.channel.nsfw) {
            return msg.language.get("INHIBITOR_NSFW");
        }
	}
};
