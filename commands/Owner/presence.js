const moment = require("moment");

exports.run = async (client, message, [status, ...game]) => {
  game = game.join(" ");

  client.user.setStatus(status);

  if (game === "list") {
    return message.reply("Here are the possible terms that you can use for my presence. `status` will just change my status colour. Not defining a second arguement will bring my status back to the way it would be when I first start up. `null` will make my status blank.");
  }

  if (game.length < 1) { 
    return client.user.setPresence({ activity: { name: `m~help  | Playing around with Butter on ${client.guilds.size} servers`, type: 0 } }); 
  } if (game.toLowerCase() === "null") {
    game = null;
    client.user.setPresence({ activity:  { name: game, type: 0 } });
  } else {
    var Game = `m~help | ${game} on ${client.guilds.size} servers`;
    client.user.setPresence({ activity: { name: Game, type: 0 } }); 
  }
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 9,
    botPerms: [],
    requiredFuncs: [],
};
  
  exports.help = {
    name: "presence",
    description: "Sets Margarine's status entirely",
    usage: "<online|idle|dnd|invisible> [game:str]",
    usageDelim: " | ",
};