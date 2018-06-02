exports.run = async (client, msg, [choice, bet]) => {
    let y = Math.random() > .5 ? "Heads": "Tails";

    if (y.toLowerCase() === choice.toLowerCase()) { var result = ["won", 2]; } 
    else { var result = ["lost", -1]; }

    client.funcs.transactions(msg, {credit: [bet, "*", result[1]]}, function(data) {
        if (data.valid === false) { return; }

        msg.channel.send("**" + y + "!** You have " + result[0] + " " + Math.abs(data.earnings) + " credits");
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
      
exports.help = {
    name: "coin",
    description: "Flip a coin!",
    usage: "<heads|tails> [bet:int]",
    usageDelim: " ",
    humanUse: "(heads|tails) (amount)"
};
