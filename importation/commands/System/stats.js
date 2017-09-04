const { version: discordVersion } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, msg) => {
  const config = require("../../../../settings.json")
  const komadaVersion = require(`${client.coreBaseDir}/package.json`).version; // eslint-disable-line
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  msg.channel.send(`= STATISTICS =

• Margarine  :: ${config.version}
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Komada     :: v${komadaVersion}
• Discord.js :: v${discordVersion}`, { code: "asciidoc" });
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "stats",
  description: "Provides some details about the bot and stats.",
  usage: "",
  usageDelim: "",
};
