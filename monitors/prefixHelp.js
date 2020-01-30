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

        if (msg.content === `${defaultPrefix}help`) {
            if (defaultPrefix !== msg.guild.settings.prefix) {
                return msg.channel.send(`Whoops! Looks like you are thinking of my default prefix. That is not the case here. Please use: ${msg.guild.settings.prefix}`); 
            }
        }
    }
};