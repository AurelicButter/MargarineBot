const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "setdefaultchannel",
            enabled: true,
            runIn: ["text"],
            aliases: ["setdchnl", "setdefaultchnl", "sdchnl"],
            description: "Set the guild's default channel.",
            usage: "<remove|channel:str>",
            permissionLevel: 6,
            extendedHelp: "The default channel is used for features like the welcome and leave messages. Not setting a default channel will block such features from running."
        });
    }

    async run(msg, [item]) {
        if (item === "remove") { item = null; }

        if (item && !item.includes("<#")) { return msg.sendLocale("RESOLVER_INVALID_CHANNEL", [item]); }

        console.log(item);
        msg.guild.settings.update("defaultChannel", item).then(() => {
            if (item) { return msg.sendLocale("SETDEFAULTCHANNEL", [msg, item]); }
            msg.sendLocale("SETDEFAULTCHANNEL_REMOVE", [msg, item]);            
        });
    }
};