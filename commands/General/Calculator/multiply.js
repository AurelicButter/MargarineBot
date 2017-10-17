exports.run = async (client, message, [x, y, z]) => {
    if (!x || !y) { return message.reply("You need two numbers to do math, baka!"); }
    
    if (!z) { return message.channel.send(`Total:  ${Number(x * y)}`); } 
    else { message.channel.send(`Total: ${Number(x * y * z)}`); }
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
  name: "multiply",
  description: "Multiply up to three numbers together.",
  usage: "[x:int] [y:int] [z:int]",
  usageDelim: " ",
};
