const moment = require("moment");

exports.run = function(client, message, [args]){
  const config = require("../../settings.json");

  args = message.content.split(" ").slice(1).join(" ");
  if(args.length < 1) { 
    args = null;
    console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Game status wiped.`);
    return client.user.setPresence({ game: { name: args, type: 0 } }); 
  }

  console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Game status changed to ${args}.`);
  client.user.setPresence({ game: { name: args, type: 0 } });
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: [],
    permLevel: 10,
    botPerms: [],
    requiredFuncs: [],
};
  
  exports.help = {
    name: "game",
    description: "Set the game status of Margarine",
    usage: "[args:args]",
    usageDelim: "",
};