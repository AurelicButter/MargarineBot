exports.run = async (client, message, [x, y, z]) => {
    if (!x || !y && y != 0) { 
        return message.reply("You need two numbers to do math, baka!"); 
    }
    
    if (!z) { 
        if (y == 0) { return message.channel.send("Total: Undefined. Error: Divided by zero."); }
        else { return message.channel.send(`Total: ${Number(x / y)}`); }
    } else { 
        if (z == 0 || y == 0) { return message.channel.send("Total: Undefined. Error: Divided by zero."); }
        message.channel.send(`Total: ${Number(x / y / z)}`); 
    }
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
  name: "divide",
  description: "Divide up to three numbers together.",
  usage: "[x:int] [y:int] [z:int]",
  usageDelim: " ",
};
