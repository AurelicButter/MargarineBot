const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "disablecommand",
            enabled: true,
            guarded: true,
            runIn: ["text"],
            aliases: ["disablecmd", "dcmd"],
            description: "Disable or reenable a command for your guild.",
            usage: "[command:command]",
            permissionLevel: 6
        });

        this.humanUse = "<command>";
    }

    async run(msg, [cmd]) {
        if (!cmd) { return msg.sendLocale("DCOMMAND_NOSTR", [msg]); }
        if (cmd.guarded) { return msg.sendLocale("DCOMMAND_GUARDED", [msg]); }

        var disabled = msg.guild.settings.disabledCommands.includes(cmd.name);

        if (!disabled) {
            msg.guild.settings.update("disabledCommands", cmd, { action: "add" }).then(() => {
                msg.sendLocale("DCOMMAND_DISABLE", [msg, cmd.name]);
            });
        } else {
            msg.guild.settings.update("disabledCommands", cmd, { action: "remove" }).then(() => {
                msg.sendLocale("DCOMMAND_ENABLE", [msg, cmd.name]);
            });
        }
    }
};