exports.run = function(client, message, args){
  if (message.mentions.users.size === 0) {
	return message.channel.send(`Baka ${message.author.username}`);	
  }
  
  let user = message.mentions.users.first()
  message.channel.send(`Baka ${user.username}! `);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["baka"],
  permLevel: 0
};

exports.help = {
  name: "Baka",
  description: "For the stupid people.",
  usage: "baka <user [Optional]>"
};