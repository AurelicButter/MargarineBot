const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "setprefix",
            enabled: true,
            runIn: ["text"],
            description: "Set the guild's prefix",
            usage: "<remove|prefix:str>",
            permissionLevel: 6,
            extendedHelp: "If a user uses remove, the prefix will be reset to the global one."
        });
    }

    async run(msg, [prefix]) {
        if (prefix === "remove") { prefix = msg.client.gateways.guilds.schema.get("prefix").default; }

        msg.guild.settings.update("prefix", prefix).then(() => {
            msg.sendLocale("SETPREFIX", [msg, prefix]);
        });
    }
};