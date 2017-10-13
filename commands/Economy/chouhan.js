exports.run = async (client, message, [credit, bet]) => {
    const sql = require("sqlite");
    sql.open("./bwd/data/score.sqlite");

    sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        if (!row) { return message.reply("You haven't signed up and received your credits yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); } 
        if (row.credits < credit) { return message.reply("You don't have that many credits, baka!"); }
        if (!credit || credit < 1) { return message.reply("You need to bet some credits to play!"); }
        else {
            die1 = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
            die2 = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
            die3 = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
            die4 = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
            die5 = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
            die6 = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);

            sum = die1 + die2 + die3 + die4 + die5 + die6;

            if (sum%2 == 0 && bet === "even") {
                credit = (row.credits + (credit*1.5)).toFixed(0);
                sql.run(`UPDATE scores SET credits = ${credit} WHERE userId = ${message.author.id}`);
                return message.reply(`Sum: ${sum} Your Guess: ${bet} You have won ${credit - row.credits} credits!`);
            } else if (sum%2 !== 0 && bet === "odd") {
                credit = (row.credits + (credit*1.5)).toFixed(0);
                sql.run(`UPDATE scores SET credits = ${credit} WHERE userId = ${message.author.id}`);
                return message.reply(`Sum: ${sum} Your Guess: ${bet} You have won ${credit - row.credits} credits!`);
            } else {
                afterMath = (row.credits - credit).toFixed(0);
                sql.run(`UPDATE scores SET credits = ${afterMath} WHERE userId = ${message.author.id}`);
                return message.reply(`Sum: ${sum} Your Guess: ${bet} You have lost ${credit} credits.`);
            }
        }
    }).catch(error => { 
        console.log(error);
        return message.reply("Error in command. Please try again later.");
    });
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
    usage: "[credits:int] <even|odd>",
    usageDelim: " ",
    extendedHelp: "A Simple Japanese dice game. Six dice are rolled and the results kept secret. Players bet on whether the sum on the dice is odd or even.",
};
