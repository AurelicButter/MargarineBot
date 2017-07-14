const config = require("../settings.json");

exports.run = function(client, message){
	message.channel.send(`Margarine is on version: ${config.version}`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['v', 'version'],
  permLevel: 0
};

exports.help = {
  name: 'Version',
  description: 'Get the current version of Margarine.',
  usage: 'version'
};