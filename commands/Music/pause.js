exports.run = async (client, msg) => {
  var handler = client.funcs.musicCheck(msg);
  if (handler === false) { return; }
  if (handler.state === "PAUSE") { return msg.send(client.speech(msg, ["pause", "paused"])); }

  handler.state = "PAUSE";
  handler.dispatcher.pause();
  msg.send(client.speech(msg, ["pause", "success"]));
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "pause",
  description: "Pauses the playlist.", usage: ""
};
