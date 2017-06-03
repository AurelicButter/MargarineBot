const config = require("../settings.json");

exports.run = function(client, message, args){
    console.log('Version command executed.');
	message.channel.send(`Margarine is on version: ${config.version}`);
}
