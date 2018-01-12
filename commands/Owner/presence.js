exports.run = async (client, message, [status, game]) => {
  client.user.setStatus(status);

  if (game === "list") {
    return message.reply("Here are the possible terms that you can use for my presence. Not defining a second arguement will bring my status back to the way it would be when I first start up. `null` will make my status blank.");
  }

  if (!game) { game = `Playing around with ${client.owner.username}`; } 
  if (game.toLowerCase() === "null") { game = null; } 
  else { game = `m~help | ${game}`; }

  client.user.setPresence({ activity: { name: game, type: 0 } }); 
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
  usage: "<online|idle|dnd|invisible> [game:str]",
  usageDelim: " | ",
  humanUse: "(online|idle|dnd|invisible)_(game)"
};