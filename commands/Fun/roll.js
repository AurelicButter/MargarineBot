exports.run = (client, message, Sides) => {
    if (Sides.length < 1) { Sides = 6; }
    if (Sides == 0) { return message.channel.send("You can't roll from 0!"); }

    Sides = Number(Sides);

    if (Number.isInteger(Sides)) { 
        var y = Math.floor(Math.random() * (Math.floor(Sides) - Math.ceil(1) + 1)) + Math.ceil(1);
        return message.channel.send(`🎲 You rolled a ${y}! 🎲`);
    } else {
        return message.channel.send("It seems you added some letters into your number. Please try again!");
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
    name: "roll",
    description: "Roll a die!",
    usage: "[Sides:str]",
    usageDelim: "",
};
