exports.run = async (client, message, [xa, ya, za]) => {
  if (Number(xa) != xa) { var x = client.funcs.constantMath(client, message, xa); } 
  else { var x = Number(xa); }

  if (Number(ya) != ya) { var y = client.funcs.constantMath(client, message, ya); } 
  else { var y = Number(ya); }

  if (!za) { var z = 0; } 
  else if (Number(za) != za) { var z = client.funcs.constantMath(client, message, za); } 
  else { var z = Number(za); }

  if ((x === null) || (y === null) || (z === null)) { return message.reply("You are trying to subtract things that aren't numbers or imaginary, baka!"); }

  message.channel.send(`Total: ${x - y - z}`);
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
  usage: "[xa:str] [ya:str] [za:str]",
  usageDelim: " ",
};