const { Monitor } = require("klasa");

module.exports = class extends Monitor {
    constructor(...args) {
        super(...args, {
            name: "prefixHelp",
            enabled: true,
            ignoreEdits: false,
            ignoreOthers: false
        });
    }

    run(msg) {
        let defaultPrefix = msg.client.gateways.guilds.schema.get("prefix").default;
        let guildPrefix = msg.guild.settings.prefix;

        if (msg.content === `${defaultPrefix}help` && defaultPrefix !== guildPrefix) {
            return msg.sendLocale("PREFIXHELP_DEFAULT", [guildPrefix]);
        }

        if (msg.content === `${defaultPrefix.replace("~", "-")}help` && defaultPrefix.replace("~", "-") !== guildPrefix) {
            return msg.sendLocale("PREFIXHELP_MISREAD");
        }
    }
};