module.exports = (client, guild) => {
    if (!client.settings.guilds.schema.defaultChannel) { client.funcs.confAdd(client); }
  
    if (client.settings.guilds.schema.defaultChannel !== null) { var channel = guild.channels.find("id", guild.settings.defaultChannel); }
    else if (guild.channels.exists("name", "general")) { var channel = guild.channels.find("name", "general"); }
    else if (guild.channels.exists("id", guild.id)) { var channel = guild.channels.find("id", guild.id); }
    else { var channel = guild.channels.find(c => c.permissionsFor(guild.me).has("SEND_MESSAGES")); }
  
    return channel;
};
  
module.exports.conf = { requiredModules: [] };
  
module.exports.help = {
    name: "defaultChannel",
    type: "functions",
    description: "Searchs for the 'default' channel of the server.",
};