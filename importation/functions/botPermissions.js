const { Permissions } = require("discord.js");

module.exports = client => Permissions.resolve([...new Set(client.commands.reduce((a, b) => a.concat(b.conf.botPerms), ["READ_MESSAGES", "SEND_MESSAGES"]))]);
