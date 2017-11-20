const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, page) => {
  const handler = client.queue.get(message.guild.id);
  if (!handler) { throw `Hmm... I've tried to find your list of songs but it doesn't look like you have a queue. Better add some by ${message.guild.settings.prefix}add.`; }

  var count;
  if (page.length < 1 || page === 1) { page = 1; count = 0; }
  else { count = (10 * (page - 1)); } 

  if (handler.songs.length < count) { return message.channel.send(`I can't show you that page for its page number is greater than my queue pages. There are currently ${Math.ceil(handler.songs.length / 10)}`); }

  if (handler.songs.length === 1) { var SongMessage = "song"; }
  else { var SongMessage = "songs"; }

  const embed = new client.methods.Embed()
  .setColor(0x04d5fd)
  .setTitle(`📻 __${message.guild.name}'s Stream of Music__`)
  .setDescription(`Currently streaming ${handler.songs.length} ${SongMessage}.`)
  .setThumbnail(message.guild.iconURL())
  .setFooter(`Page: ${page} of ${Math.ceil(handler.songs.length / 10)}`);

  for (let i = count; i < Math.min(handler.songs.length, (count + 10)); i++) {
    embed.addField(`${i + 1}) ${handler.songs[i].title}`, `Requested by: ${handler.songs[i].requester} - Run time: ${moment.duration(handler.songs[0].seconds * 1000).format("h:mm:ss", { trim: false })}`);
  }

  return message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "queue",
  description: "Displays the music queue.",
  usage: "[page:int]",
  usageDelim: "",
  extendedHelp: "",
};
