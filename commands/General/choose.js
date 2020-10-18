const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "choose",
            enabled: true,
            runIn: ["text"],
            aliases: ["choice"],
            description: "The one stop picker for hard choices!",
            usage: "[choice:str] [...]", usageDelim: " | "
        });

        this.humanUse = "[choice] | [choice] | [...etc]";
    }

    async run(msg, [...choice]) {
        if (choice.length < 2) { return msg.sendLocale("CHOOSE_LACKCHOICE", [msg]); }

        var numChoice = Math.floor(Math.random() * choice.length);
        msg.sendLocale("CHOOSE_SUCCESS", [msg, msg.author.username, choice[numChoice]]);
    }
};