const { Command } = require("klasa");
const { getInfo } = require("ytdl-core");
const ytPlay = require("youtube-playlist");
const getInfoAsync = require("util").promisify(getInfo);

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "queueadd",
            runIn: ["text"],
            description: "Adds a song or a playlist to the queue.",
            usage: "[song:str]",
            extendedHelp: "Note: Only Youtube song and Youtube playlist URLs only. Youtube mixes do not count."
        });
    }

    async run(msg, [song]) {
        var handler = this.client.util.musicCheck(msg);
        if (handler === false) { return; }
        
        var id = [];
      
        if (song.match(/(playlist\?list=\S{30,34})/)) { 
            msg.channel.send(this.client.speech(msg, ["queueadd", "listDetect"]));
            var list = await Promise.resolve(ytPlay(song, "id"));
              
            for(var x = 0; x < list.data.playlist.length; x++) {
                id.push(list.data.playlist[x]);
            }
        } else if (song.match(/(?:v=)(\S{11})/)) {
            id.push(song.match(/(?:v=)(\S{11})/)[1]);
        } else { throw msg.channel.send(this.client.speech(msg, ["queueadd", "noURL"])); }
      
        for (var x = 0; x < id.length; x++) {
            try {
                var info = await getInfoAsync(`https://youtu.be/${id[x]}`);
      
                handler.queue.push({
                    url: `https://youtu.be/${id[x]}`,
                    title: info.title,
                    seconds: info.length_seconds,
                    requester: msg.author.tag
                });
            } catch(err) { msg.channel.send(this.client.speech(msg, ["queueadd", "errCatch"], [["-param1", id[x]]])); }    
        }
      
        if (id.length === 1) { msg.channel.send(this.client.speech(msg, ["queueadd", "success"], [["-param1", info.title]])); }
        else { msg.channel.send(this.client.speech(msg, ["queueadd", "multi"], [["-param1", id.length]])); }
    }
};