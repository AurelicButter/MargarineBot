const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, msg) => {
  const handler = client.music.get(msg.guild.id);
  if (!handler) { throw client.speech(msg, ["func-music", "general", "noQueue"]); }
  if (handler.queue.length < 1) { return msg.channel.send(client.speech(msg, ["nowplaying", "noQueue"])); }
  if (handler.state !== "PLAY") { return msg.channel.send(client.speech(msg, ["nowplaying", "notPlay"])); }
  
  let song = handler.queue[0];
  const embed = new client.methods.Embed()
  .setColor(0x04d5fd)
  .setTimestamp()
  .setTitle(`📻 __${msg.guild.name}'s Music Stream__`)
  .setDescription("*Streaming all your requests from the fabulous library of Youtube.*")
  .setThumbnail(song.image)
  .addField("**Title:**", `[${song.title}](${song.url})`)
  .addField("**Requested by:**", song.requester, true)
  .addField("**Time Left:**", `${moment.duration((song.seconds * 1000) - handler.dispatcher.count).format("h:mm:ss", { trim: false })} out of ` + moment.duration(song.seconds * 1000).format("h:mm:ss", { trim: false }), true);

  msg.channel.send({embed});
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["np", "whatsplaying", "whatsplayingfam"],
  permLevel: 0,
  botPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "nowplaying",
  description: "See what's currently playing in VC.", usage: ""
};
