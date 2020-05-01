const { Event } = require("klasa");

/* 
 * Event watches for deleted starboard messages and updates the data as not to cause 
 * Margarine to crash if another reaction was added to the original message.
 */
module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            name: "starboardWatch",
            enabled: true,
            event: "messageDelete"
        });
    }

    async run(message) {
        //Message is not in a guild, do nothing.
        if (message.guild === undefined) { return; }

        let sbConfig = message.guild.settings.starboard;
        if (sbConfig.sbCache.includes(message.id)) {
            var index = sbConfig.sbCache.indexOf(message.id);
            var msgLink = sbConfig.msgCache[index];

            message.guild.settings.update("starboard.msgCache", msgLink, { action: "remove" }).then(() => {
                message.guild.settings.update("starboard.sbCache", message.id, { action: "remove" });
            });
        }    
    }
};