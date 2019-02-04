module.exports = async client => {
    if (!client.settings.guilds.schema.modlog) { await client.settings.guilds.add("modlog", { type: "TextChannel" }); }
    if (!client.settings.guilds.schema.defaultChannel) { await client.settings.guilds.add("defaultChannel", { type: "TextChannel"}); }
    if (!client.settings.guilds.schema.lang) { await client.settings.guilds.add("lang", { type: "string", value: "en" }); }
    if (!client.settings.guilds.schema.muteRole) { await client.settings.guilds.add("muteRole", {type: "role"}); }
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "confAdd",
  type: "functions",
  description: "Adds all configurations nessessary.",
};