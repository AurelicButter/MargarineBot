const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "8ball",
            enabled: true,
            runIn: ["text"],
            description: "Ask the magic 8ball wizard for an answer!"
        });
    }

    async run(msg) {
        msg.sendLocale("EIGHTBALL", [msg, msg.author.username]);
    }
};