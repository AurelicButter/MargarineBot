exports.run = async (client, msg) => {
  var vcID = client.funcs.musicCheck(msg);
  if (vcID === false) { return; }

  vcID.channel.leave();
  client.music.delete(msg.guild.id);
  msg.channel.send(client.speech(msg, ["leave"]).replace("-channel", vcID.channel.name));
};
  
exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};
  
exports.help = {
  name: "leave",
  description: "Leaves the VC that you are in.", usage: ""
};  