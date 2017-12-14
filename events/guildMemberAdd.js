exports.run = (client, guild) => {
  var channel = client.funcs.defaultChannel(client, guild.guild);
  client.channels.get(channel.id).send(`${guild.user.username} is buttered up and has joined the server!`); 
};