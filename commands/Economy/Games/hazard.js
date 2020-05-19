const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

function roll (time) {
    var rolls = [];
    for (var a = 0; a < time; a++) {
        var x = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
        var y = Math.floor(Math.random() * (Math.floor(6) - Math.ceil(1) + 1)) + Math.ceil(1);
        rolls.push(x + y);
    }
    return rolls;
};

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "hazard",
            enabled: true,
            runIn: ["text"],
            description: "Gamble your credits in a early version of craps, a dice game.",
            usage: "<bet:intcheck{1,}>", usageDelim: " ",
            extendedHelp: "An early English game played with two dice. The game 'Craps' developed from hazard. The game is popular in North America but is not in the rest of the world."
        });

        this.humanUse = "<bet>";
    }

    async run(msg, [bet]) {
        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.sendLocale("DATACHECK_NOACCOUNT"); }
        if (data.credits < bet) { return msg.sendLocale("DATACHECK_LACKCREDIT"); }

        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(msg.guild.name, msg.guild.iconURL())
            .setColor(0x04d5fd);

        const sumAll = [roll(1)[0]]; 
        const choice = [5, 6, 7, 8, 9];
        var castMain = choice[~~(Math.random() * choice.length)]; 
        var earnings, results, chance;

        if (sumAll[0] < 4) { results = 1; } 
        else if (castMain === sumAll[0]) { results = 0; } 
        else if (sumAll[0] > 10) {
            if (castMain === 5 || castMain === 9) { results = 1; } 
            else if (castMain === 6 || castMain === 8) { results = (sumAll[0] === 11) ? 0 : 1; }
            else { results = (sumAll[0] === 12) ? 0 : 1; }
        } else {
            chance = choice[~~(Math.random() * choice.length)];
            while (castMain === chance) { chance = choice[~~(Math.random() * choice.length)]; } 
            
            var rolls = roll(3);
            rolls.forEach(element => { sumAll.push(element); });

            for (var i = 1; i < 5; i++) {
                if (castMain === sumAll[i] || chance === sumAll[i]) { results = 0; i = 5; }
                else if (i === 4) { results = 1; }
            }
        }

        if (chance && results === 0) {
            switch (Math.abs(castMain - 7)) {
                case 2:
                    if (Math.abs(chance - 7) === 3) { earnings = 4/3; } 
                    else if (Math.abs(chance - 7) === 2) { earnings = 1; } 
                    else if (Math.abs(chance - 7) === 1) { earnings = 4/5; } 
                    else { earnings = 2/3; } 
                    break;
                case 1:
                    if (Math.abs(chance - 7) === 3) { earnings = 5/3; } 
                    else if (Math.abs(chance - 7) === 2) { earnings = 5/4; } 
                    else if (Math.abs(chance - 7) === 1) { earnings = 1; } 
                    else { earnings = 5/6; } 
                    break;
                case 0:
                    if (Math.abs(chance - 7) === 3) { earnings = 2/1; } 
                    else if (Math.abs(chance - 7) === 2) { earnings = 3/2; } 
                    else if (Math.abs(chance - 7) === 1) { earnings = 6/5; } 
                    else { earnings = 1; } 
                    break;
            }
        } else if (results === 0) { earnings = 2; } 
        else { earnings = 1; }

        if (!bet) { var result = ["X", bet, 0]; } 
        else if (results === 0) {
            earnings = (bet * earnings).toFixed(0);
            var result = ["won", (bet * earnings) - bet];
        } else { var result = ["lost", -bet]; }

        chance = (chance) ? ` | Chance: ${chance}` : "";
        embed.addField("Lucky numbers:", `Starter: ${castMain}${chance}`, true);
        embed.addField("Sums:", sumAll.join(", "), true);

        if (sumAll[0] < 4) { embed.addField("Result:", "Rolled less than a 4. Auto loss."); }
        else if (sumAll[0] > 10) { embed.addField("Result:", `Rolled higher than a 10! Your numbers determine you ${result[0]}!`); }
        else if (result[0] === "lost") { embed.addField("Result:", `You have lost ${bet} credits`); }
        else { embed.addField("Result:", `You have won ${Math.abs(data.earnings)} credits`); }

        this.client.dataManager("update", [`credits=${result[1]}`, msg.author.id], "users");
        msg.channel.send({embed});
    }
};