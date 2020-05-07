const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "roll",
            runIn: ["text"],
            description: "Roll a die.",
            usage: "<sides:intcheck{2,}>"
        });

        this.humanUse = "<sides (2 or greater)>";
    }

    async run(msg, [sides]) {
        if (sides === 0) { return msg.sendLocale("ROLL_NOZERO", [msg]); }
        if (sides < 0) { return msg.sendLocale("ROLL_NOZERO", [msg]); }

        var value = Math.floor(Math.random() * (Math.floor(sides) - Math.ceil(1) + 1)) + Math.ceil(1);
        msg.sendLocale("ROLL_SUCCESS", [msg, value]);
    }
};