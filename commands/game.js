const config = require("../settings.json");

exports.run = function(client, message, args){
  args = message.content.split(" ").slice(1).join(" ");
  if(args === "") { args = null; }

  console.log("Game status changed.");
  client.user.setGame(args);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["game"],
  permLevel: 5
};

exports.help = {
  name: "Game",
  description: "Set the game status.",
  usage: "game <args>"
};
