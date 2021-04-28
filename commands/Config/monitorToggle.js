const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "monitorToggle",
            enabled: true,
            guarded: true,
            runIn: ["text"],
            aliases: ["mtoggle"],
            description: "Enable or disable a monitor for your server.",
            usage: "[monitor:monitor]",
            permissionLevel: 6
        });

        this.humanUse = "<monitor>";
    }

    async run(msg, [monitor]) {
        if (!monitor) { return msg.sendLocale("MONITORTOGGLE_NOMONITOR", [msg]); }

        let disabled = msg.guild.settings.monitors[monitor.name];

        if (disabled === undefined) {
            return msg.sendLocale("MONITORTOGGLE_NOTOGGLE", [msg]);
        }

        msg.guild.settings.update(`monitors.${monitor.name}`, !disabled, msg.guild).then(() => {
            if (disabled) {
                return msg.sendLocale("MONITORTOGGLE_DISABLE", [msg, monitor.name]);
            } 
            msg.sendLocale("MONITORTOGGLE_ENABLE", [msg, monitor.name]);
        });
    }
};