const yt = require("ytdl-core");

exports.run = async (client, msg) => {
  const handler = client.queue.get(msg.guild.id);
  if (!handler) { throw `Add some songs to the mix first with ${msg.guild.settings.prefix}queueadd [Youtube URL]`; }
  
  if (!msg.guild.voiceConnection) {
    await client.commands.get("join").run(client, msg);
    if (!msg.guild.voiceConnection) { return; }
    return this.run(client, msg);
  }

  if (handler.playing) { 
    if (msg.member.voiceConnection !== msg.guild.voiceConnection) { throw "I'm sorry. I'm already playing in another voice channel on your guild!"; }

    throw "I'm already playing in your channel.";
  } else { handler.playing = true; }
    
  (function play(song) {
    if (song === undefined) {
      return msg.channel.send("All your selected tunes have been played. I'll be taking my leave now.").then(() => {
      handler.playing = false;
      return msg.member.voiceChannel.leave();
    });
  }
    
  msg.channel.send(`📻 Playing ${song.requester}'s request: **${song.title}**`).catch(err => client.emit("log", err, "error"));
  
  return msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes: 2 })
    .on("end", () => { setTimeout(() => {
      handler.songs.shift();
      play(handler.songs[0]);
    }, 100); })
  
    .on("error", err => msg.channel.send(`error: ${err}`).then(() => {
      handler.songs.shift();
      play(handler.songs[0]);
    }));
  }(handler.songs[0]));
    
  return null;
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "play",
  description: "Plays the queue of music.",
  usage: "[songURL:str]"
};
