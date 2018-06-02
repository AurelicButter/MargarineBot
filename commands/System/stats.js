/* Base command taken from Komada. Modified slightly*/
const { version: discordVersion } = require("discord.js");
const { version: komadaVersion } = require("komada");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message) => {
  const config = require("../../assets/settings.json");
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send(`= GENERAL =
• Margarine  :: ${config.version}
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}

= USERS =
• Users      :: ${client.users.size}
• Servers    :: ${client.guilds.size}
• Channels   :: ${client.channels.size.toLocaleString()}

= DEPENDENCIES =
• Komada     :: v${komadaVersion}
• Discord.js :: v${discordVersion}
• Node.js    :: ${process.version}`, { code: "asciidoc" });
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};

exports.help = {
  name: "stats",
  description: "Provides some details about the bot and stats.",
  usage: ""
};