const moment = require("moment");

exports.run = function(client, message){
    console.log(`[${moment().format('YYYY-MM-DD HH:mm')}] Margarine greeted someone.`);
    message.delete().catch();
    message.channel.send(`Hello ${message.author.username}!`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["greet"],
  permLevel: 0
};

exports.help = {
  name: "Greet",
  description: "Have Margarine greet you with a hello!",
  usage: "greet"
};
