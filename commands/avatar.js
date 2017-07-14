exports.run = function(client, message, args){
  message.channel.send(message.author.avatarURL);
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