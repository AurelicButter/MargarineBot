const { Command } = require("klasa");
const yt = require("ytdl-core");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "play",
            runIn: ["text"],
            requiredPermissions: ["CONNECT", "SPEAK"],
            description: "Plays the queue of music."
        });
    }

    async run(msg) {
        const handler = this.client.music.get(msg.guild.id);

        if (!handler) {
            if(msg.member.voice.channelID) {
                await this.client.commands.get("join").run(msg);
                if (!this.client.music.get(msg.guild.id)) { return; }
                return this.run(msg);
            }

            throw msg.sendLocale("MUSICCHECK_USERNOVC");
        }

        if (handler.state === "PLAY") { 
            if (msg.member.voice.channelID !== handler.channel.id) { throw msg.sendLocale("MUSICCHECK_MISMATCHVC"); }

            throw msg.sendLocale("PLAY_ALREADY", [msg]);
        } else if (handler.state === "PAUSE") { return this.client.commands.get("resume").run(msg); }

        if (handler.queue.length === 0) { return msg.sendLocale("PLAY_NOQUEUE", [msg]); }
    
        handler.state = "PLAY";
        this.play(msg, handler, handler.queue[0]);
    
        return null; 
    }

    play(msg, handler, song) {
        if (song === undefined) {
            return msg.sendLocale("PLAY_FINISHED", [msg]).then(() => {
                handler.state = "STOP";
            });
        }

        msg.sendLocale("PLAY_NEXTSONG", [msg, song.requester, song.title]);
  
        return handler.dispatcher = handler.connection.play(yt(song.url, { audioonly: true }), { passes: 2 })
            .on("end", () => { setTimeout(() => {
                handler.queue.shift();
                this.play(msg, handler, handler.queue[0]);
            }, 100); })
  
            .on("error", err => msg.channel.send(`error: ${err}`).then(() => {
                handler.queue.shift();
                this.play(msg, handler, handler.queue[0]);
            }));
    }
};