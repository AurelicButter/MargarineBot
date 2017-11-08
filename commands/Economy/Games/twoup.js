exports.run = async (client, message, [credit]) => {
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

        var z; let rolls = []; var earnings; var result;
        for (z = 0; z < 7; z++) {
             var x = (Math.random() > .5) ? "heads" : "tails";
            rolls.push(x);
        }

        if (((rolls[0] === rolls[1]) && (rolls[0] === "heads")) || 
            ((rolls[1] === rolls[2]) && (rolls[1] === "heads")) ||
            ((rolls[2] === rolls[3]) && (rolls[2] === "heads")) ||
            ((rolls[3] === rolls[4]) && (rolls[3] === "heads")) ||
            ((rolls[4] === rolls[5]) && (rolls[4] === "heads")) ||
            ((rolls[5] === rolls[6]) && (rolls[5] === "heads")) ||
            ((rolls[6] === rolls[7]) && (rolls[6] === "heads"))) {  
            earnings = (credit * .2).toFixed(0);
            result = "won";
        }
        else if ((rolls[0] !== rolls[1]) && (rolls[0] === rolls[2]) && (rolls[0] !== rolls[3]) && (rolls[0] === rolls[4]) && (rolls[0] !== rolls[5]) && (rolls[0] === rolls[6]) && (rolls[0] !== rolls[7])) {
            earnings = (credit * .8).toFixed(0);
            result = "won";
        } else {
            earnings = credit;
            result = "lost";
        }

        if (result === "won") { credit = Number(row.credits) + Number(earnings); }
        else { credit = Number(row.credits) - Number(earnings); } 

        db.run(`UPDATE scores SET credits = ${credit} WHERE userId = ${message.author.id}`);
        message.channel.send(`**Coins:** ${rolls.join(", ")}\nYou have ${result} ${earnings} credits.`); 
    });
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["two-up"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "twoup",
    description: "Bet on coin flips. Get two heads in a row and win or hope for all five odds!",
    usage: "[credits:str]",
    usageDelim: "",
    extendedHelp: "Two-up is a traditional Australian gambling game, involving a designated 'spinner' throwing two coins into the air. Players bet on whether the coins will fall with both heads up, both tails up, or with one head and one tail up (known as 'odds'). It is traditionally played on Anzac Day in pubs and clubs throughout Australia, in part to mark a shared experience with Diggers through the ages.",
};
