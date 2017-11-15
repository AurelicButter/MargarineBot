exports.run = async (client, message, [x, ya, za]) => {
  if (Number(x) != x) { x = client.funcs.constantMath(client, message, x); } 
  else { x = Number(x); }

  if (Number(ya) != ya) { var y = client.funcs.constantMath(client, message, ya); } 
  else { var y = Number(ya); }

  if (!za) { var z = 1; } 
  else if (Number(za) != za) { var z = client.funcs.constantMath(client, message, za); } 
  else { var z = Number(za); }

  if ((x === null) || (y === null) || (z === null)) { return message.reply("You are trying to multiply things that aren't numbers or imaginary, baka!"); }

  message.channel.send(`Total: ${x * y * z}`);
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
  usage: "[xa:str] [ya:str] [za:str]",
  usageDelim: " ",
};