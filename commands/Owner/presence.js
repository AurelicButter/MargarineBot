exports.run = async (client, message, [status, game, type]) => {
  client.user.setStatus(status);

  const list = {
    play: "PLAYING", 
    stream: "STREAMING", 
    listen: "LISTENING", 
    watch: "WATCHING"
  };

  if (!game) { game = `Playing around with ${client.owner.username}`; } 
  if (game.toLowerCase() === "null") { game = null; } 
  else { game = `m~help | ${game}`; }

  client.user.setPresence({ activity: { name: game, type: list[type] } }); 
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm"],
  aliases: [],
  permLevel: 9,
  botPerms: [],
};
  
exports.help = {
  name: "presence",
  description: "Sets Margarine's status entirely",
  usage: "<online|idle|dnd|invisible> [game:str] [play|stream|listen|watch]",
  usageDelim: " | ",
  humanUse: "(online|idle|dnd|invisible)_(game)_(play|stream|listen|watch)"
};