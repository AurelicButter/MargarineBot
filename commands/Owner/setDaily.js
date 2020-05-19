const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "setdaily",
            enabled: true,
            runIn: ["text", "dm"],
            permissionLevel: 9,
            description: "Set the amount each user should earn with the daily command.",
            usage: "<amount:intcheck{1,}>"
        });

        this.humanUse = "<amount (1 or greater)>";
    }

    async run(msg, [amount]) {
        this.client.settings.update("daily", amount);

        msg.sendLocale("DAILY_UPDATE", [amount]);
    }
};