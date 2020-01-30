const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "resume",
            runIn: ["text"],
            description: "Resumes the playlist."
        });
    }

    async run(msg) {
        var handler = this.client.util.musicCheck(msg, "handler");
        if (handler === false) { return; }
        if (handler.state !== "PAUSE") { return msg.channel.send(this.client.speech(msg, ["resume", "noPause"])); }

        handler.dispatcher.resume();
        handler.state = "PLAY";
        msg.channel.send(this.client.speech(msg, ["resume", "success"]));
    }
};