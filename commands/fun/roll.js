exports.run = function(client, message, args){
    if (args.length < 1) { args = 6; }
 
    var x = Number(args);
    if (x == "0") { return message.channel.send("You can't roll from 0!"); }
    if (!x) { return message.channel.send("It seems you added some letters into your number. Please try again!"); }
 
    var y = Math.floor(Math.random() * (Math.floor(x) - Math.ceil(1) + 1)) + Math.ceil(1);
 
    return message.channel.send(`🎲 You rolled a ${y}! 🎲`);
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
    name: "roll",
    description: "Roll a die!",
    usage: "[sides:int]",
    usageDelim: "",
};