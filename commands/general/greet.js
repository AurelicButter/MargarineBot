const moment = require("moment");

exports.run = function(client, message, [user]){
	console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Margarine greeted someone.`);
    message.delete().catch();
	
	if (message.mentions.users.size === 0) {
		return message.channel.send(`Hello ${message.author.username}`);	
	}
    
    let prsn = message.mentions.users.first();
	message.channel.send(`Hello ${prsn.username}! `);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
    cooldown: 0,
};

exports.help = {
  name: "greet",
  description: "Have Margarine greet you or someone with a hello!",
  usage: "[user]",
};