const config = require("../settings.json");

exports.run = function(client, message, args){
    if(message.author.id !== config.ownerID) return;
	console.log('Welcome command executed.');
	message.channel.send(`Hello! I am Margarine!\n
	I will be a bot user on here so feel free to use me when I am online!\n
	To find out what commands there are, do m~info.`);
}
