exports.run = async (client, message, [x, y, z]) => {
    if (!x || !y) { return message.reply("You want to subtract nothing to one number? You don't need to call me for it, baka!"); }
    if (!z) { z = 0; }

    message.channel.send(`Total: ${Number(x - y - z)}`);
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
  name: "subtract",
  description: "Subtract up to three numbers together. Note: (X-Y-Z)",
  usage: "[x:int] [y:int] [z:int]",
  usageDelim: " ",
};
