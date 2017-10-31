const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message) => {
  const config = require("../../settings.json");
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send(`= STATISTICS =
• Margarine  :: ${config.version}
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size}
• Servers    :: ${client.guilds.size}
• Channels   :: ${client.channels.size.toLocaleString()}
• Komada     :: v0.20.10 //Hard coded into the bot. Could not get the version straight from the npm package. Same for Discord.js.
• Discord.js :: v12.0.0`, { code: "asciidoc" });
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
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
