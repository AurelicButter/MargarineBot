const yt = require("ytdl-core");

exports.run = async (client, msg) => {
  const handler = client.music.get(msg.guild.id);

  if (!handler) {
    if(msg.member.voice.channelID) {
      await client.commands.get("join").run(client, msg);
      if(!client.music.get(msg.guild.id)) { return; }
      return this.run(client, msg);
    }

    throw client.speech(msg, ["func-music", "general", "userVC"]);
  }

  if (handler.state === "PLAY") { 
    if (msg.member.voice.channelID !== handler.channel.id) { throw client.speech(msg, ["func-music", "general", "mismatch"]); }

    throw client.speech(msg, ["play", "alreadyPlay"]);
  } else if (handler.state === "PAUSE") { return client.commands.get("resume").run(client, msg); }
  else { handler.state = "PLAY"; }

  if(handler.queue.length === 0) { return msg.channel.send(client.speech(msg, ["play", "noQueue"])); }
    
  (function play(song) {
    if (song === undefined) {
      return msg.channel.send(client.speech(msg, ["play", "allDone"])).then(() => {
      handler.state = "STOP";
    });
  }
    
  msg.channel.send(client.speech(msg, ["play", "nextSong"])
    .replace("-request", song.requester)
    .replace("-title", song.title));
  
  return handler.dispatcher = handler.connection.play(yt(song.url, { audioonly: true }), { passes: 2 })
    .on("end", () => { setTimeout(() => {
      handler.queue.shift();
      play(handler.queue[0]);
    }, 100); })
  
    .on("error", err => msg.channel.send(`error: ${err}`).then(() => {
      handler.queue.shift();
      play(handler.queue[0]);
    }));
  }(handler.queue[0]));
    
  return null;
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [], permLevel: 0,
  botPerms: ["CONNECT", "SPEAK"]
};

exports.help = {
  name: "play",
  description: "Plays the queue of music.",
  usage: "[songURL:str]"
};