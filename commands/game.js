const config = require("../settings.json");
const moment = require("moment");

exports.run = function(client, message, args){
  args = message.content.split(" ").slice(1).join(" ");
  if(!args) { args = null; }

  console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Game status changed to ${args}.`);
  client.user.setGame(args);
}

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
