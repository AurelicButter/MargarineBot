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
        msg.channel.send(this.client.speech(msg, ["func-fun", "crash"], [["-user", msg.author.username]]));
    }
};