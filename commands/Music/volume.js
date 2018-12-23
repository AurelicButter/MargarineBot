exports.run = async (client, msg, [volume]) => {
  var handler = client.funcs.musicCheck(msg);
  if (handler === false) { return; }

  if (!volume) { return msg.send(client.speech(msg, ["volume", "noArgs"]).replace("-vol", Math.round(dispatcher.volume * 50))); }
  if (volume === 0) { return msg.send(client.speech(msg, ["volume", "zero"])); }
  if (volume > 100) { return msg.send(client.speech(msg, ["volume", "overHun"])); }
  if (handler.playing !== "PLAY") { return msg.send(client.speech(msg, ["volume", "notPlay"])); }

  const dispatcher = handler.dispatcher;
  var emote = (volume < (dispatcher.volume * 50)) ? ["🔉 Decreasing"] : ["🔊 Increasing"];

  dispatcher.setVolume(Math.min(volume) / 50, 2);
  msg.send(client.speech(msg, ["volume", "success"]).replace("-action", emote).replace("-vol", Math.round(dispatcher.volume * 50)));
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
  usage: "[volume:int]", humanUse: "[Volume percentage]"
};