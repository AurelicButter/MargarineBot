const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "setaward",
            enabled: true,
            runIn: ["text", "dm"],
            permissionLevel: 10,
            description: "Sets how much an award gives out for credits",
            usage: "<suggest|bug|minor|major> <amount:intcheck{1,}>", usageDelim: " "
        });

        this.humanUse = "<suggest|bug|minor|major> <amount (1 or greater)>";
    }

    async run(msg, [type, amount]) {
        this.client.settings.update(`awards.${type}`, amount);
        msg.sendLocale("AWARD_UPDATE", [type, amount]);
    }
};