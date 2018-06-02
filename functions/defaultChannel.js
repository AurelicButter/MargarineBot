module.exports = (client, guildID, args) => {
    var guild = client.guilds.find("id", guildID);
    if (!client.settings.guilds.schema.defaultChannel || !client.settings.guilds.schema.modlog) { client.funcs.confAdd(client); }
  
    if (args[0] === "mod") { 
        if (client.settings.guilds.schema.modlog !== null) { 
            return guild.channels.find("id", guild.settings.modlog);
        } else { return guild.channels.find("id", args[1].channel.id); }
    }
    if (client.settings.guilds.schema.defaultChannel.default !== null) { return guild.channels.find("id", guild.settings.defaultChannel); }
    else if (guild.channels.find("name", "general")) { return guild.channels.find("name", "general"); }
    else if (guild.channels.find("id", guild.id)) { return guild.channels.find("id", guild.id); }
    else { return guild.channels.find(c => c.permissionsFor(guild.me).has("SEND_MESSAGES")); }
};
  
module.exports.conf = { requiredModules: [] };
  
module.exports.help = {
    name: "defaultChannel",
    type: "functions",
    description: "Searchs for the 'default' channel of the server."
};