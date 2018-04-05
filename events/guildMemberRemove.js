exports.run = (client, guild) => {
    if (!client.settings.guilds.schema.welcomeChannel) { client.funcs.confAdd(client); } 
    
    if (client.settings.guilds.schema.welcomeChannel === null) { var channel = client.funcs.defaultChannel(client, guild.guild); } 
    else { var channel = guild.guild.channels.find("id", guild.guild.settings.welcomeChannel); }

    client.channels.get(channel.id).send(`${guild.user.username} has left the server. Good luck out there!`); 
};