exports.run = async (client, msg, [status, game, type]) => { client.funcs.presenceHelper(client, game, type, status); };

exports.conf = {
  enabled: true,
  runIn: ["text", "dm"],
  aliases: [],
  permLevel: 9,
  botPerms: []
};
  
exports.help = {
  name: "presence",
  description: "Sets Margarine's status entirely",
  usage: "<online|idle|dnd|invisible> [game:str] [play|stream|listen|watch]",
  usageDelim: " | ",
  humanUse: "(online|idle|dnd|invisible)_(game)_(play|stream|listen|watch)"
};