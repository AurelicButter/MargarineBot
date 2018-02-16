exports.run = async (client, message, [bet]) => {
    let rolls = [];
    for (var z = 0; z < 7; z++) {
        var x = (Math.random() > .5) ? "heads" : "tails";
        rolls.push(x);
    }

    for (var y = 0; y < 7; y++) {
        if (rolls[y] === rolls[y + 1] && rolls[y] === "heads") { var result = ["won", 1.4]; break;}
        else if (y === 6) { 
            if ((rolls[0] !== rolls[1]) && (rolls[0] === rolls[2]) && (rolls[0] !== rolls[3]) && (rolls[0] === rolls[4]) && (rolls[0] !== rolls[5]) && (rolls[0] === rolls[6]) && (rolls[0] !== rolls[7])) {
                var result = ["won", 2];
            } else { var result = ["lost", -1];}
        }
    }
        
    if (result === false) {
        if ((rolls[0] !== rolls[1]) && (rolls[0] === rolls[2]) && (rolls[0] !== rolls[3]) && (rolls[0] === rolls[4]) && (rolls[0] !== rolls[5]) && (rolls[0] === rolls[6]) && (rolls[0] !== rolls[7])) {
            result = ["won", 1];
        } else { result = ["lost", -1]; }
    }

    client.funcs.transactions(client, message, {credit: [bet, "*", result[1]]}, function(data) {
        if (data.valid === false) { return; }

        message.channel.send(`**Coins:** ${rolls.join(", ")}\nYou have ${result[0]} ${Math.abs(data.earnings)} credits.`); 
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["two-up"],
    permLevel: 0,
    botPerms: [],
};

exports.help = {
    name: "twoup",
    description: "Bet on coin flips. Get two heads in a row and win or hope for all five odds!",
    usage: "[bet:int]",
    extendedHelp: "Two-up is a traditional Australian gambling game, involving a designated 'spinner' throwing two coins into the air. Players bet on whether the coins will fall with both heads up, both tails up, or with one head and one tail up (known as 'odds'). It is traditionally played on Anzac Day in pubs and clubs throughout Australia, in part to mark a shared experience with Diggers through the ages.",
    humanUse: "(Amount)"
};