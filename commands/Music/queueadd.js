const yt = require("ytdl-core");
const ytPlay = require("youtube-playlist");
const getInfoAsync = require("util").promisify(yt.getInfo);

exports.run = async (client, msg, [song]) => {
  var handler = client.funcs.musicCheck(msg);
  if (handler === false) { return; }
  var id = [];

  if (song.match(/(playlist\?list=\S{30,34})/)) { 
    msg.send(client.speech(msg, ["queueadd", "listDetect"]));
    list = await Promise.resolve(ytPlay(song, "id"));
        
    for(var x = 0; x < list.data.playlist.length; x++) {
      id.push(list.data.playlist[x]);
    }
  } else if (song.match(/(?:v=)(\S{11}$)/)) {
    id.push(song.split(".com/")[1].match(/(?:v=)(\S{11}$)/)[1]);
  } else { throw client.speech(msg, ["queueadd", "noURL"]); }

  for(var x = 0; x < id.length; x++) {
    try {
      info = await getInfoAsync("https://youtu.be/" + id[x]);

      handler.queue.push({
        url: "https://youtu.be/" + id[x],
        title: info.title,
        seconds: info.length_seconds,
        requester: msg.author.tag,
        image: info.thumbnail_url
      });
    } catch(err) {
      msg.send("Whoops! Looks like I can't access this video. <https://youtu.be/" + id[x] + ">");
    }    
  }

  if (id.length == 1) { msg.send(client.speech(msg, ["queueadd", "success"]).replace("-title", info.title)); }
  else { msg.send(client.speech(msg, ["queueadd", "multi"]).replace("-number", id.length)); }
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
  description: "Adds a song or a playlist to the queue.",
  usage: "[song:str]", humanUse: "[Song/Playlist URL]",
  extendedHelp: "Note: Only Youtube song and Youtube playlist URLs only. Youtube mixes do not count."
};