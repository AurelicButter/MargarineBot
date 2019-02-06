exports.run = async (client, msg) => {
  var handler = client.funcs.musicCheck(msg);
  if (handler === false) { return; }
  if (handler.state !== "PAUSE") { return msg.channel.send(client.speech(msg, ["resume", "noPause"])); }

  handler.dispatcher.resume();
  handler.state = "PLAY";
  msg.channel.send(client.speech(msg, ["resume", "success"]));
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "resume",
  description: "Resumes the playlist.", usage: ""
};
