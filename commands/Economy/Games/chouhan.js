exports.run = async (client, message, [credit, bet]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");

    db.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("You haven't signed up and received your credits yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); } 
        if (row.credits < credit) { return message.reply("You don't have that many credits, baka!"); }
        if (!credit || credit < 1) { return message.reply("You need to bet some credits to play!"); }

        credit = Number(credit);
        const checker = Number.isInteger(credit) ? true : false;

        if (checker === true) {
            if (!credit) { return message.reply("Credits? Hello? I need an amount of credits!"); }
            else if (credit < 0) { return message.reply("What are you trying to do? Steal someone's credits? That's illegal, you know."); }
            else if (credit === 0) { return message.reply("Betting nothing to play? This is a gambling game. Get some credits and come back."); }    
        } else { return message.reply("You can't split a credit! Give me a whole number."); }

        var z; let rolls = []; var result;
        for (z = 0; z < 6; z++) {
            var x = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
            rolls.push(x);
        }

        var sum = rolls[0] + rolls[1] + rolls[2] + rolls[3] + rolls[4] + rolls[5];

        if ((sum%2 === 0 && bet === "even") || (sum%2 !== 0 && bet === "odd")) {
            result = "won";
            credit = Number(credit * .5).toFixed(0);
        } else {
            result = "lost";
            credit = Number(credit * -1);
        }
        db.run(`UPDATE scores SET credits = ${Number(row.credits) + Number(credit)} WHERE userId = ${message.author.id}`);
        message.channel.send(`**Sum:** ${sum} \n**Your Guess:** ${bet} \n*You have ${result} ${Math.abs(credit)} credits.*`);
    });
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["chō-han", "chōhan", "chou-han"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "chouhan",
    description: "Bet your credits on if the sum of six dice are even or odd.",
    usage: "[credits:str] <even|odd>",
    usageDelim: " ",
    extendedHelp: "A simple Japanese dice game. Six dice are rolled and the results kept secret. Players bet on whether the sum on the dice is odd or even.",
};
