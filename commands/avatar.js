exports.run = function(client, message, args){
  let user = message.mentions.users.first()
message.channel.send(message.user.avatarURL);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['avatar'],
  permLevel: 0
};

exports.help = {
  name: 'Avatar',
  description: 'Avatar command.',
  usage: 'avatar'
};