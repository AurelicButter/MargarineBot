exports.run = async (client, message, [x, y, z]) => {
  if (!x || !y) { return message.channel.send("You need two numbers to subtract, baka!"); }
  x === client.funcs.constantMath(client, message, x);
  y === client.funcs.constantMath(client, message, y);

  if (!z) { z = "0"; } 
  else { z = client.funcs.constantMath(client, message, z); }

  if ((x === null) || (y === null) || (z === null)) { return message.reply("You are trying to subtract things that aren't numbers or imaginary, baka!"); }

  message.channel.send(`Total: ${Number(x) - Number(y) - Number(z)}`);
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
  usage: "[x:str] [y:str] [z:str]",
  usageDelim: " ",
};