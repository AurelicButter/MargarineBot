exports.run = function(client, message, args){
  var x = args;

   if (args === "" || args == null) { 
       return message.channel.send("I am sorry. Please specify the amount of sides on the die to roll from."); 
   }

   min = Math.ceil(1);
   max = Math.floor(x);
   y = Math.floor(Math.random() * (max - min + 1)) + min;

   message.channel.send(y);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["roll"],
  permLevel: 2
};

exports.help = {
  name: "Roll",
  description: "Roll command.",
  usage: "roll"
};
