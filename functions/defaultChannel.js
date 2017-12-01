module.exports = (client, guild) => {
    let Channel = null;
  
    if (guild.channels.exists("name", "general")) { Channel = guild.channels.find("name", "general"); }
    if (guild.channels.exists("name", "off_topic")) { Channel = guild.channels.find("name", "off_topic"); } 
    if (guild.channels.exists("id", guild.id)) { Channel = guild.channels.find("id", guild.id); }
    else { Channel = guild.channels.find(c => c.permissionsFor(guild.me).has("SEND_MESSAGES")); }
  
    return Channel;
};
  
module.exports.conf = { requiredModules: [] };
  
module.exports.help = {
    name: "defaultChannel",
    type: "functions",
    description: "Searchs for the 'default' channel of the server.",
};