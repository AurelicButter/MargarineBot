exports.run = async (client, msg, [volume]) => {
  if (!msg.guild.voiceConnection) { throw "I am not connected in a voice channel, please add some songs to the mix first!"; }
  const handler = client.queue.get(msg.guild.id);
  if (!handler || handler.playing === false) { throw "Kind of hard to adjust the volume if I am not playing music."; }

  const dispatcher = msg.guild.voiceConnection.dispatcher;

  if (!volume) { return msg.send(`📢 Volume: ${Math.round(dispatcher.volume * 50)}%`); }
  if (volume === 0) { return msg.send("You might as well mute me if you don't want any noise."); }
  if (volume > 100) { return msg.send("100% is the max. You jsut can't have 110% with this bot."); }

  var emote = (volume < (dispatcher.volume * 50)) ? ["🔉", "Decreasing"] : ["🔊", "Increasing"];

  dispatcher.setVolume(Math.min(volume) / 50, 2);
  msg.send(`${emote[0]} ${emote[1]} the volume! Volume: ${Math.round(dispatcher.volume * 50)}%`);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["vol"],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "volume",
  description: "Manage the volume for current song.",
  usage: "[volume:int]"
};
