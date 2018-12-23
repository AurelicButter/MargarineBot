exports.run = async (client, msg) => {
  var handler = client.funcs.musicCheck(msg);
  if (handler === false) { return; }

  handler.dispatcher.end();
  msg.channel.send(client.speech(msg, ["skip"]));
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "skip",
  description: "Skips the current song.", usage: ""
};
