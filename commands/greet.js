const moment = require("moment");

exports.run = function(client, message, args){
	console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Margarine greeted someone.`);
  message.delete().catch();
	
	if (message.mentions.users.size === 0) {
		return message.channel.send(`Hello ${message.author.username}`);	
	}
	
	let user = message.mentions.users.first()
	message.channel.send(`Hello ${user.username}! `);
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
  usage: "greet <mentioned person [optional]>"
};
