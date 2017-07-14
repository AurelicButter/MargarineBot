exports.run = function(client, message){
    let person = message.author.username
    message.channel.send(`${person} has died.`)
    .then(message => {
        setTimeout(() => { message.edit("Respawning..."); }, 1000);
        setTimeout(() => { message.edit(`Revival complete. Welcome back, ${person}`); }, 1000)
    });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kms', 'killme'],
  permLevel: 0
};

exports.help = {
  name: 'Killme',
  description: 'Kill your self with this command.',
  usage: 'Killme'
};