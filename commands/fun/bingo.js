exports.run = function(client, message){
    let y = Math.floor(Math.random() * (Math.floor(75) - Math.ceil(1) + 1)) + Math.ceil(1);

    if (y < 15){
        console.log("B" + y);
        message.channel.send("B" + y);
    } else if (y > 15 && y < 30){
        console.log("I" + y);
        message.channel.send("I" + y);
    } else if (y > 30 && y < 45){
        console.log("N" + y);
        message.channel.send("N" + y);
    } else if (y > 45 && y < 60){
        console.log("G" + y);
        message.channel.send("G" + y);
    } else {
        console.log("O" + y);
        message.channel.send("O" + y);
    }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [""],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
      
exports.help = {
    name: "bingo",
    description: "Supplies bingo numbers to play bingo.",
    usage: "",
    usageDelim: "",
};
