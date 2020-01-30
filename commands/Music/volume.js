const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "volume",
            runIn: ["text"],
            aliases: ["vol"],
            description: "Manage the volume for current song.",
            usage: "[volume:int]"
        });
    }

    async run(msg, [volume]) {
        var handler = this.client.util.musicCheck(msg, "handler");
        if (handler === false) { return; }

        if (!volume) { return msg.channel.send(this.client.speech(msg, ["volume", "noArgs"], [["-vol",Math.round(dispatcher.volume * 50)]])); }
        if (volume === 0) { return msg.channel.send(this.client.speech(msg, ["volume", "zero"])); }
        if (volume > 100) { return msg.channel.send(this.client.speech(msg, ["volume", "overHun"])); }
        if (handler.playing !== "PLAY") { return msg.channel.send(this.client.speech(msg, ["volume", "notPlay"])); }       
      
        const dispatcher = handler.dispatcher;
        var emote = (volume < (dispatcher.volume * 50)) ? ["🔉 Decreasing"] : ["🔊 Increasing"];
      
        dispatcher.setVolume(Math.min(volume) / 50, 2);
        msg.channel.send(this.client.speech(msg, ["volume", "success"], [["-param1", emote], ["-param2", Math.round(dispatcher.volume * 50)]]));
    }
};