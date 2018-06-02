exports.run = async (client, msg) => {
  if (!msg.guild.voiceConnection) { throw "I am not connected in a voice channel, please add some songs to the mix first!"; }
  if (msg.guild.voiceConnection.dispatcher.paused === false) { return msg.send("The stream is not paused, baka!"); }

  msg.guild.voiceConnection.dispatcher.resume();
  msg.send("▶ Now resuming your tunes. Keep partying!");
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
  description: "Resumes the playlist.",
  usage: ""
};
