const yt = require("ytdl-core");
const getInfoAsync = require("util").promisify(yt.getInfo);
const url = require("url");

exports.run = async (client, msg, [song]) => {
  const YTRegExp = new RegExp(/(?:v.|d\/|e\/)([\w-_]{11})/);
  var songID = url.parse(song).path.split("/")[1];
  var id = songID.match(YTRegExp);

  if (id === null) { throw "You must provide a valid YouTube URL."; }
  const info = await getInfoAsync(`https://youtu.be/${id[1]}`);

  if (client.queue.has(msg.guild.id) === false) { client.queue.set(msg.guild.id, { playing: false, songs: [], }); }

  client.queue.get(msg.guild.id).songs.push({
    url: song,
    title: info.title,
    seconds: info.length_seconds,
    requester: msg.author.username,
    image: info.thumbnail_url
  });

  msg.send(`🎵 Added **${info.title}** to the queue 🎶`);
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "queueadd",
  description: "Adds a song the the queue.",
  usage: "[song:str]",
};

exports.init = (client) => { client.queue = new client.methods.Collection(); };
