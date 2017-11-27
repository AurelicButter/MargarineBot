exports.run = async (client, message, [x, y, z]) => {
  if (!x || !y) { return message.channel.send("You need two numbers to divide, baka!"); }
  x === client.funcs.constantMath(client, message, x);
  y === client.funcs.constantMath(client, message, y);

  if (!z) { z = "1"; } 
  else { z = client.funcs.constantMath(client, message, z); }
  
  if ((x === null) || (y === null) || (z === null)) { return message.reply("You are trying to divide things that aren't numbers or imaginary, baka!"); }
  if ((y === 0) || (z === 0)) { return message.channel.send("Total: Undefined. Error: Divided by zero."); }

  message.channel.send(`Total: ${Number(x) / Number(y) / Number(z)}`);
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
  usage: "[x:str] [y:str] [z:str]",
  usageDelim: " ",
};