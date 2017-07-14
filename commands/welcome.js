const config = require("../settings.json");

exports.run = function(client, message){
	message.channel.send(`Hello! I am Margarine! I will be a bot user on here so feel free to use me when I am online!`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['welcome'],
  permLevel: 2
};

exports.help = {
  name: 'Welcome',
  description: 'Send the join message when Margarine joins the server.',
  usage: 'welcome'
};