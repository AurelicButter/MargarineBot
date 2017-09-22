const moment = require("moment");

exports.run = function(client, message, [status, ...game]){
  game = game.join(" ");

  client.user.setStatus(status);

  if (game === "list") {
    return message.reply("Here are the possible terms that you can use for my presence. `status` will just change my status colour. Not defining a second arguement will bring my status back to the way it would be when I first start up. `null` will make my status blank.");
  }

  if(game.length < 1) { 
    console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Presence has been set to ${status} with the default game status.`);
    return client.user.setPresence({ game: { name: `m~help  | Playing around with Butter on ${client.guilds.size} servers`, type: 0 } }); 
  } if (game === "status") {
    return console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Status changed to ${status}.`);
  } if(game.toLowerCase() === "null") {
    game = null;
    client.user.setPresence({ game:  { name: game, type: 0 } });
    return console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Presence has been set to ${status} while setting the game back to default.`);  
  } else {
    var Game = `m~help | ${game} on ${client.guilds.size} servers`;
    client.user.setPresence({ game: { name: Game, type: 0 } }); 
    return console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Presence has been set to ${status} while playing ${Game}.`);
  }
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 10,
    botPerms: [],
    requiredFuncs: [],
};
  
  exports.help = {
    name: "presence",
    description: "Sets Margarine's status entirely",
    usage: "<online|idle|dnd|invisible> [game:str]",
    usageDelim: " ",
};
