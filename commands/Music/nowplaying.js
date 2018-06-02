const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message) => {
  if (!message.guild.voiceConnection) { return message.channel.send("How can I be playing music when I'm not in a voice channel, baka!"); }

  const handler = client.queue.get(message.guild.id);
  if (!handler || handler.playing === false) { return message.channel.send(`I'm not playing any music right now! Add some using ${message.guild.settings.prefix}`); }
  
  let song = handler.songs[0];
  const embed = new client.methods.Embed()
  .setColor(0x04d5fd)
  .setTimestamp()
  .setTitle(`📻 __${message.guild.name}'s Music Stream__`)
  .setDescription("*Streaming all your requests from the fabulous library of Youtube.*")
  .setThumbnail(song.image)
  .addField("**Title:**", `[${song.title}](${song.url})`)
  .addField("**Requested by:**", song.requester, true)
  .addField("**Time Left:**", `${moment.duration((handler.songs[0].seconds * 1000) - message.guild.voiceConnection.dispatcher.time).format("h:mm:ss", { trim: false })} out of ` + moment.duration(handler.songs[0].seconds * 1000).format("h:mm:ss", { trim: false }), true);

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["np", "whatsplaying", "whatsplayingfam"],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "nowplaying",
  description: "See what's currently playing in VC.",
  usage: ""
};
