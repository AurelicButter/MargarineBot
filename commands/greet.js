exports.run = function(client, message){
    console.log('Margarine greeted someone.');
    message.channel.send('Hello!');
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['greet'],
  permLevel: 0
};

exports.help = {
  name: 'Greet',
  description: 'Have Margarine greet you with a hello!',
  usage: 'greet'
};