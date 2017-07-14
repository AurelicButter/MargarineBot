exports.run = function(client, message, args){
    message.channel.send(`${message.author.username} has started a poll with the question:\n${args}`)
        .then(message => {
            message.react('✅');
            message.react('❌');
        });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['poll'],
  permLevel: 0
};

exports.help = {
  name: 'Poll',
  description: 'Poll users',
  usage: 'poll <Topic>'
};