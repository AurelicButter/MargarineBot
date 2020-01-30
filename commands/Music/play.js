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

            throw msg.channel.send(this.client.speech(msg, ["func-music", "general", "userVC"]));
        }

        if (handler.state === "PLAY") { 
            if (msg.member.voice.channelID !== handler.channel.id) { throw msg.channel.send(this.client.speech(msg, ["func-music", "general", "mismatch"])); }

            throw msg.channel.send(this.client.speech(msg, ["play", "alreadyPlay"]));
        } else if (handler.state === "PAUSE") { return this.client.commands.get("resume").run(msg); }

        if (handler.queue.length === 0) { return msg.channel.send(this.client.speech(msg, ["play", "noQueue"])); }
    
        handler.state = "PLAY";
        this.play(msg, handler, handler.queue[0]);
    
        return null; 
    }

    play(msg, handler, song) {
        if (song === undefined) {
            return msg.channel.send(this.client.speech(msg, ["play", "allDone"])).then(() => {
                handler.state = "STOP";
            });
        }

        msg.channel.send(this.client.speech(msg, ["play", "nextSong"], [["-param1", song.requester], ["-param2", song.title]]));
  
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