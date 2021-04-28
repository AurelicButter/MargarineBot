const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "setmodlog",
            enabled: true,
            runIn: ["text"],
            description: "Set the server's modlog channel.",
            usage: "<remove|channel:str>",
            permissionLevel: 6,
            extendedHelp: "The modlog channel is used for moderation messages. Not setting a modlog channel will redirect these messages to a default channel or the current channel."
        });
    }

    async run(msg, [item]) {
        if (item && !item.includes("<#")) { return msg.sendLocale("RESOLVER_INVALID_CHANNEL", [item]); }
        if (item === "remove") { item = null; }

        msg.guild.settings.update("modlog", item).then(() => {
            if (item) { return msg.sendLocale("SETMODLOG", [msg, item]); }
            msg.sendLocale("SETMODLOG_REMOVE", [msg, item]);            
        });
    }
};