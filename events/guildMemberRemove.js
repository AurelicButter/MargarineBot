exports.run = (client, guild) => {
    let channel = client.funcs.defaultChannel(client, guild.guild);
    client.channels.get(channel.id).send(`${guild.user.username} has left the server. Good luck out there!`); 
};