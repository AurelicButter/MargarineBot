exports.run = async (client, message, [credit]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");

    db.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("You haven't signed up and received your credits yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); }
        if (row.credits < credit) { return message.reply("You don't have that many credits, baka!"); }

        credit = Number(credit);
        const checker = Number.isInteger(credit) ? true : false;

        if (checker === true) {
            if (!credit) { return message.reply("Credits? Hello? I need an amount of credits!"); }
            else if (credit < 0) { return message.reply("What are you trying to do? Steal someone's credits? That's illegal, you know."); }
            else if (credit === 0) { return message.reply("Betting nothing to play? This is a gambling game. Get some credits and come back."); }    
        } else { return message.reply("You can't split a credit! Give me a whole number."); }

        var bet = credit; var z; let rolls = []; let sumAll = [];
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
        } else {
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
                    
            var i = 1; var loop = true;
            do {
                if (castMain === sumAll[i]) { var results = 0; var loop = false;  } 
                else if (chance === sumAll[i]) { var results = 1; var loop = false; } 
                else if (i === 4) { var results = 1; var loop = false; }
                else { i += 1; } 
            } while (loop === true);
        }
        var result = gameOption[results]; var earnings;

        if (result === "won" && chance > 3) {
            if (castMain === 5 || castMain === 9) {
                if ((chance === 4) || (chance === 10)) { earnings = 4/3; } 
                if ((chance === 5) || (chance === 9)) { earnings = 1; } 
                if ((chance === 6) || (chance === 8)) { earnings = 4/5; } 
                if (chance === 7) { earnings = 2/3; } 
            } if (castMain === 6 || castMain === 8) {
                if ((chance === 4) || (chance === 10)) { earnings = 5/3; } 
                if ((chance === 5) || (chance === 9)) { earnings = 5/4; } 
                if ((chance === 6) || (chance === 8)) { earnings = 1; } 
                if (chance === 7) { earnings = 5/6; } 
            } if (castMain === 7) {
                if ((chance === 4) || (chance === 10)) { earnings = 2/1; } 
                if ((chance === 5) || (chance === 9)) { earnings = 3/2; } 
                if ((chance === 6) || (chance === 8)) { earnings = 6/5; } 
                if (chance === 7) { earnings = 1; } 
            }
            earnings = (credit * Number(earnings)).toFixed(0);
        } else if (result === "won") { var earnings = (credit * 2); } 
        else if (result === "lost") { var earnings = (credit * -1); }

        if (earnings < 1) { earnings = 1; }
        
        credit = Number(row.credits) + Number(earnings);

        const embed = new client.methods.Embed()
            .setTimestamp()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setColor("#4d5fd")
            .addField("Caster's Number:", castMain, true);
        if (chance) { embed.addField("Chance Number:", chance, true); }
        embed.addField("Sums:", sumAll.join(", "), true);
        if (sum[0] < 4) { embed.addField("Rolled less than a 4. Auto loss."); }
        if (sum[0] > 10 && result === "won") { embed.addField("Rolled higher than a 10! Sum and caster numbers determine a win!"); }
        if (sum[0] > 10 && result === "won") { embed.addField("Rolled higher than a 10! Sum and caster numbers determine a loss!"); }
        embed.addField("Result:", `You have ${result} ${Math.abs(earnings)} credits`);

        db.run(`UPDATE scores SET credits = ${credit} WHERE userId = ${message.author.id}`); 
        message.channel.send({embed});
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
    usage: "[credits:str]",
    usageDelim: "",
    extendedHelp: "An early English game played with two dice. The game 'Craps' developed from hazard. The game is popular in North America but is not in the rest of the world.",
};