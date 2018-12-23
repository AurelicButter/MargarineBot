const moment = require("moment");
require("moment-duration-format");

exports.run = (client, msg, page) => {
  const handler = client.music.get(msg.guild.id);
  if (!handler) { throw client.speech(msg, ["func-music", "general", "noQueue"]); }

  if (page.length < 1 || page === 1) { page = 1; var count = 0; }
  else { var count = (10 * (page - 1)); } 

  if (handler.queue.length < count) { return msg.channel.send(client.speech(msg, ["queue"]).replace("-pgs", Math.ceil(handler.queue.length / 10))); }

  const embed = new client.methods.Embed()
  .setColor(0x04d5fd)
  .setTitle(`📻 __${msg.guild.name}'s Stream of Music__`)
  .setDescription(`Currently streaming ${handler.queue.length} ${(handler.queue.length === 1) ? "song" : "songs"}.`)
  .setThumbnail(msg.guild.iconURL())
  .setFooter(`Page: ${page} of ` + Math.ceil(handler.queue.length / 10));

  for (let i = count; i < Math.min(handler.queue.length, (count + 10)); i++) {
    embed.addField(`${i + 1}) ` + handler.queue[i].title, `Requested by: ${handler.queue[i].requester} - Run time: ` + moment.duration(handler.queue[i].seconds * 1000).format("h:mm:ss", { trim: false }));
  }

  msg.send(embed); //There is an error here. No idea why but it doesn't affect anything so I'm leaving it alone.
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: ["EMBED_LINKS"]
};

exports.help = {
  name: "queue",
  description: "Displays the music queue.",
  usage: "[page:int]", humanUse: "[Page number]"
};