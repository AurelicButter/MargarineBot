exports.run = async (client, msg, [bet, credit]) => {
    let rolls = [];
    for (var z = 0; z < 6; z++) { rolls.push(Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1)); }

    var sum = rolls[0] + rolls[1] + rolls[2] + rolls[3] + rolls[4] + rolls[5];

    if ((sum%2 === 0 && bet === "even") || (sum%2 !== 0 && bet === "odd")) { var result = ["won", 1.5]; } 
    else { var result = ["lost", -1]; }

    client.funcs.transactions(msg, {credit: [credit, "*", result[1]]}, function(data) {
        if (data.valid === false) { return; }

        msg.channel.send(`**Sum:** ${sum} \n**Your Guess:** ${bet} \n*You have ${result[0]} ${Math.abs(data.earnings)} credits.*`);
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["chō-han", "chōhan", "chou-han"],
    permLevel: 0,
    botPerms: []
};
  
exports.help = {
    name: "chouhan",
    description: "Bet your credits on if the sum of six dice are even or odd.",
    usage: "<even|odd> [credits:int]",
    usageDelim: " ",
    extendedHelp: "A simple Japanese dice game. Six dice are rolled and the results kept secret. Players bet on whether the sum on the dice is odd or even.",
    humanUse: "(even|odd)_(amount)"
};