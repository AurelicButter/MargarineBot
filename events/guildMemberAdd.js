exports.run = (client, guild) => {
  if (!client.settings.guilds.schema.welcomeChannel) { client.funcs.confAdd(client); } 
  
  if (client.settings.guilds.schema.welcomeChannel === null) { var channel = client.funcs.defaultChannel(client, guild.id); } 
  else { var channel = guild.guild.channels.find("id", guild.guild.settings.welcomeChannel); }

  var perm = client.channels.get(channel.id).permissionsFor(client.user).has("SEND_MESSAGES");

  if (perm === true) { client.channels.get(channel.id).send(`${guild.user.username} is buttered up and has joined the server!`); }
};