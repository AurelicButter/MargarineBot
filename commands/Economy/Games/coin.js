exports.run = async (client, message, [choice, bet]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    if (!bet) { return message.reply("Credits? Hello? I need an amount of credits!"); }
    else if (bet < 0) { return message.reply("What are you trying to do? Steal someone's credits? That's illegal, you know."); }
    else if (bet === 0) { return message.reply("Betting nothing to play? This is a gambling game. Get some credits and come back."); }
    else if (Number.isInteger(bet) === false) { return message.reply("You can't split a credit! Give me a whole number."); }

    db.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => { 
        if (err) { return console.log(err); }
        if (!row) { return message.reply("You haven't signed up and received your credits yet! D:"); }
        if (row.credits < bet) { return message.reply("You don't have that many credits, baka!"); }

        let y = Math.random() > .5 ? "heads": "tails";

        if (y === choice.toLowerCase()) {
            var result = "won";
            var earnings = bet * 2;   
        } else {
            var result = "lost";
            var earnings = bet * -1;
        }

        y = (y === "heads") ? "Heads!" : "Tails!";

        db.run(`UPDATE scores SET credits = ${row.credits + earnings} WHERE userId = ${message.author.id}`)
        message.channel.send("**" + y + "** You have " + result + " " + Math.abs(earnings) + " credits");
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};
      
exports.help = {
    name: "coin",
    description: "Flips a coin!",
    usage: "<heads|tails> [bet:int]",
    usageDelim: " ",
    humanUse: "(heads|tails) (amount)"
};
