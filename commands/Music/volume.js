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

        if (!volume) { return msg.sendLocale("VOLUME_NOARGS", [msg, Math.round(dispatcher.volume * 50)]); }
        if (volume === 0) { return msg.sendLocale("VOLUME_ZERO", [msg]); } 
        if (volume > 100) { return msg.sendLocale("VOLUME_MAX", [msg]); } 
        if (handler.playing !== "PLAY") { return msg.sendLocale("VOLUME_PAUSED", [msg]); }      
      
        const dispatcher = handler.dispatcher;
        var emote = (volume < (dispatcher.volume * 50)) ? ["🔉 Decreasing"] : ["🔊 Increasing"];
      
        dispatcher.setVolume(Math.min(volume) / 50, 2);
        msg.sendLocale("VOLUME_SUCCESS", [msg, emote, Math.round(dispatcher.volume * 50)]);
    }
};