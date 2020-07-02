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
        var defaultPrefix = msg.client.gateways.guilds.schema.get("prefix").default;
        var guildPrefix = msg.guild.settings.prefix;

        if (msg.content === `${defaultPrefix}help`) {
            if (defaultPrefix !== guildPrefix) {
                return msg.sendLocale("PREFIXHELP_DEFAULT", [guildPrefix]);
            }
        }
        if (msg.content === `${defaultPrefix.replace("~", "-")}help`) {
            if (defaultPrefix.replace("~", "-") !== guildPrefix) {
                return msg.sendLocale("PREFIXHELP_MISREAD");
            }
        }
    }
};