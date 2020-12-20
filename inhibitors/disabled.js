const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {
    constructor(...args) {
        super(...args, {
            name: "disabled",
            enabled: true
        });
    }

	run(msg, command) {
        if (!command.enabled) { return msg.language.get("INHIBITOR_DISABLED_GLOBAL"); }
        
		if (msg.guildSettings.disabledCommands.includes(command.name)) { 
            return msg.language.get("INHIBITOR_DISABLED_GUILD"); 
        }
	}

};

