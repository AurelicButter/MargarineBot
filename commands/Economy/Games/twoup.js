exports.run = async (client, msg, [bet]) => {
    let rolls = [];
    for (var z = 0; z < 7; z++) {
        var x = (Math.random() > .5) ? "heads" : "tails";
        rolls.push(x);
    }

    let fact = [];
    for (var y = 0; y < 7; y++) {
        if (rolls[y] === rolls[y + 1] && rolls[y] === "heads") { var result = ["won", 1.4]; break; }
        else if (rolls[y] !== rolls[1]) { fact.push(true); }
        else if (y === 6) { var result = fact.includes(false) ? ["lost", -1] : ["won", 2]; } 
        else { fact.push(false); }
    }

    client.funcs.transactions(msg, {credit: [bet, "*", result[1]]}, function(data) {
        if (data.valid === false) { return; }

        msg.channel.send(`**Coins:** ${rolls.join(", ")}\nYou have ${result[0]} ${Math.abs(data.earnings)} credits.`); 
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["two-up"],
    permLevel: 0,
    botPerms: []
};

exports.help = {
    name: "twoup",
    description: "Bet on coin flips. Get two heads in a row and win or hope for all five odds!",
    usage: "[bet:int]",
    extendedHelp: "Two-up is a traditional Australian gambling game, involving a designated 'spinner' throwing two coins into the air. Players bet on whether the coins will fall with both heads up, both tails up, or with one head and one tail up (known as 'odds'). It is traditionally played on Anzac Day in pubs and clubs throughout Australia, in part to mark a shared experience with Diggers through the ages.",
    humanUse: "(Amount)"
};