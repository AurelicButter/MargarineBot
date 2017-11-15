exports.run = async (client, message, [xa, ya, za]) => {
    if (Number(xa) != xa) { var x = client.funcs.constantMath(client, message, xa); } 
    else { var x = Number(xa); }
  
    if (Number(ya) != ya) { var y = client.funcs.constantMath(client, message, ya); } 
    else { var y = Number(ya); }
  
    if (!za) { var z = 1; } 
    else if (Number(za) != za) { var z = client.funcs.constantMath(client, message, za); } 
    else { var z = Number(za); }
  
    if ((x === null) || (y === null) || (z === null)) { return message.reply("You are trying to divide things that aren't numbers or imaginary, baka!"); }
    if ((y === 0) || (z === 0)) { return message.channel.send("Total: Undefined. Error: Divided by zero."); }

    message.channel.send(`Total: ${x / y / z}`);
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
  usage: "[xa:str] [ya:str] [za:str]",
  usageDelim: " ",
};