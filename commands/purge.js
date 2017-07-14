exports.run = function(client, message, args) {
    let messagecount = parseInt(args.join(' '));
    message.channel.fetchMessages({
        limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['purge'],
  permLevel: 2
};

exports.help = {
  name: 'Purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge <number>'
};