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
        msg.channel.send(this.client.speech(msg, ["func-fun", "eightball"], [["-user", msg.author.username]]));
    }
};