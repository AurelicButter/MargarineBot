const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "crash",
            enabled: true,
            runIn: ["text"],
            description: "👀 Do it. I dare you to."
        });
    }

    async run(msg) {
        msg.sendLocale("CRASH", [msg, msg.author.username]);
    }
};