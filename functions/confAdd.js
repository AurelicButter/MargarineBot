module.exports = async client => {
    if (!client.settings.guilds.schema.modlog) { await client.settings.guilds.add("modlog", { type: "TextChannel" }); }
    if (!client.settings.guilds.schema.starboard) { await client.settings.guilds.add("starboard", { type: "TextChannel" }); }
    if (!client.settings.guilds.schema.defaultChannel) { await client.settings.guilds.add("defaultChannel", {type: "TextChannel"}); }
    if (!client.settings.guilds.schema.welcomeChannel) { await client.settings.guilds.add("welcomeChannel", { type: "TextChannel"}); }
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "confAdd",
  type: "functions",
  description: "Adds all configurations nessessary.",
};