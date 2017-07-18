exports.run = function(client, message, args){
    f = 0;
    message.channel.send(`${user.username} has payed respects.`);
    message.channel.send(`${f + 1} total respects payed.`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Rip'],
  permLevel: 4
};

exports.help = {
  name: 'rip',
  description: 'Rip command.',
  usage: 'rip'
};