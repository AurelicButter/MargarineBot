exports.run = async (client, msg) => {
  var check = client.funcs.musicCheck(msg, "join");
  if (check === false) { return; }
  var vcID = msg.guild.channels.get(msg.member.voice.channelID);

  const permissions = vcID.permissionsFor(msg.guild.me);
  if (permissions.has("CONNECT") === false) { return msg.channel.send(client.speech(msg, ["join", "noConnect"])); }
  if (permissions.has("SPEAK") === false) { return msg.channel.send(client.speech(msg, ["join", "noSpeak"])); }

  var vcSettings = {
    channel: vcID,
    queue: [],
    volume: 100,
    state: "STOP",
    connection: null,
    dispatcher: null
  };

  vcID.join().then(connection => { vcSettings.connection = connection; });
  client.music.set(msg.guild.id, vcSettings);

  msg.channel.send(client.speech(msg, ["join", "success"]).replace("-channel", vcID.name));
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "join",
  description: "Joins the VC that you are in.", usage: ""
};

exports.init = (client) => { client.music = new client.methods.Collection(); };