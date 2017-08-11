exports.run = function(client, message, args){
   if (args.length < 1) { 
      return message.channel.send("I am sorry. Please specify the amount of sides on the die to roll from."); 
   } else {
      var x = args;
      var y = Math.floor(Math.random() * (Math.floor(x) - Math.ceil(1) + 1)) + Math.ceil(1);

      message.channel.send(`🎲 You rolled a ${y}! 🎲`);
   }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["roll"],
  permLevel: 0
};

exports.help = {
  name: "Roll",
  description: "Roll a die.",
  usage: "roll <sides>"
};
