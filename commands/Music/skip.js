const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "skip",
            runIn: ["text"],
            description: "Skips the current song."
        });
    }

    async run(msg) {
        var handler = this.client.util.musicCheck(msg, "handler");
        if (handler === false) { return; }

        handler.dispatcher.end();
        msg.channel.send(this.client.speech(msg, ["skip"])); 
    }
};