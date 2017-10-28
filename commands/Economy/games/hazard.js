exports.run = async (client, message, [bet]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");

    db.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("You haven't signed up and received your credits yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); } 
        if (row.credits < bet) { return message.reply("You don't have that many credits, baka!"); }
        if ((!bet) || (bet < 1)) { return message.reply("You need to bet some credits to play!"); }
        else {
            var z; let rolls = []; const sumAll = [];
            for (z = 0; z < 2; z++) {
                var x = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
                rolls.push(x);
            }
            var sum = rolls[0] + rolls[1];
            sumAll.push(sum);

            const casterChoice = [5, 6, 7, 8, 9];
            var castMain = casterChoice[~~(Math.random() * casterChoice.length)];
            const gameOption = ["won", "lost"];

            if (sum < 4) { var results = 1; } 
            else if (castMain === sum) { var results = 0; } 
            else if (sum > 10) {
                if (castMain === 5 || castMain === 9) { var results = 1; } 
                if (castMain === 6 || castMain === 8) {
                    if (sum === 11) { var results = 0; } 
                    if (sum === 12) { var results = 1; }
                } if (castMain === 7) {
                    if (sum === 11) { var results = 1; } 
                    if (sum === 12) { var results = 0; }
                }
            } else if (sum > 3 && sum < 11) {
                var chance = casterChoice[~~(Math.random() * casterChoice.length)];
                while (castMain === chance) { var chance = casterChoice[~~(Math.random() * casterChoice.length)]; } 
                var a = 0;
                do {
                    var x = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
                    var y = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
                    var sum = x + y;
                    sumAll.push(sum);
                    a += 1;
                } while (a < 3);
                    
                var i = 1;
                do {
                    if (castMain === sumAll[i]) { var results = 0; var i = 4; } 
                    else if (chance === sumAll[i]) { var results = 1; var i = 4; } 
                    else if (i = 4) { var results = 1; }
                    else { i += 1; } 
                } while (i < 4);
            }
            var result = gameOption[results];

            if (result === "won") { var credit = (bet * 2); } 
            if (result === "won" && chance > 3) {
                if (castMain === 5 || castMain === 9) {
                    if (chance === 4) { var earnings = 4/3; } 
                    if (chance === 5) { var earnings = 1; } 
                    if (chance === 6) { var earnings = 4/5; } 
                    if (chance === 7) { var earnings = 2/3; } 
                    if (chance === 8) { var earnings = 4/5; } 
                    if (chance === 9) { var earnings = 1; }
                    if (chance === 10) { var earnings = 4/3; } 
                } if (castMain === 6 || castMain === 8) {
                    if (chance === 4) { var earnings = 5/3; } 
                    if (chance === 5) { var earnings = 5/4; } 
                    if (chance === 6) { var earnings = 1; } 
                    if (chance === 7) { var earnings = 5/6; } 
                    if (chance === 8) { var earnings = 1; } 
                    if (chance === 9) { var earnings = 5/4; }
                    if (chance === 10) { var earnings = 5/3; } 
                } if (castMain === 7) {
                    if (chance === 4) { var earnings = 2/1; } 
                    if (chance === 5) { var earnings = 3/2; } 
                    if (chance === 6) { var earnings = 6/5; } 
                    if (chance === 7) { var earnings = 1; } 
                    if (chance === 8) { var earnings = 6/5; } 
                    if (chance === 9) { var earnings = 3/2; }
                    if (chance === 10) { var earnings = 2/1; } 
                }
                var credit = (bet * earnings);
            } 
            if (result === "lost") { var credit = bet * -1; }

            const embed = new client.methods.Embed()
                .setTimestamp()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setColor("#4d5fd")
                .addField("Caster's Number:", castMain, true);
            if (chance) { embed.addField("Chance Number:", chance, true); }
            embed.addField("Sums:", sumAll.join(", "), true)
                .addField("Result:", `You have ${result} ${Math.abs(credit.toFixed(0))} credits`);

            db.run(`UPDATE scores SET credits = ${row.credits - credit.toFixed(0)} WHERE userId = ${message.author.id}`); 
            message.channel.send({embed});
        }
    });
    db.close();
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
    name: "hazard",
    description: "Gamble your credits in a early version of craps, a dice game.",
    usage: "[bet:int]",
    usageDelim: "",
    extendedHelp: "An early English game played with two dice. The game 'Craps' developed from hazard. The game is popular in North America but is not in the rest of the world.",
};
