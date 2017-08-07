exports.run = function(client, message, args){
  if (message.mentions.users.size === 0) {
    return message.channel.send(message.author.avatarURL);	
  }
  
  let user = message.mentions.users.first();
  return message.channel.send(user.avatarURL);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["avatar"],
  permLevel: 0
};

exports.help = {
  name: "Avatar",
  description: "Avatar command.",
  usage: "avatar <mentioned user [Optional]>"
};
