const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "twoup",
            enabled: true,
            runIn: ["text"],
            description: "Bet on coin flips. Get two heads in a row and win or hope for all five odds!",
            usage: "<bet:int>",
            extendedHelp: "Two-up is a traditional Australian gambling game, involving a designated 'spinner' throwing two coins into the air. Players bet on whether the coins will fall with both heads up, both tails up, or with one head and one tail up (known as 'odds'). It is traditionally played on Anzac Day in pubs and clubs throughout Australia."
        });
    }

    async run(msg, [bet]) {
        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noAccount"])); }
        if (data.credits < bet) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "lackCredits"])); }
    
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
    
        if (result[0] === "won") { 
            this.client.dataManager("update", [`credits=${data.credits + (bet * result[1])}`, msg.author.id], "users");
            msg.channel.send(this.client.speech(msg, ["twoup", "win"], [["-result", rolls.join(", ")], ["-earnings", bet]]));
        }
    
        this.client.dataManager("update", [`credits=${data.credits - bet}`, msg.author.id], "users");
        msg.channel.send(this.client.speech(msg, ["twoup", "lose"], [["-result", rolls.join(", ")], ["-earnings", bet]]));    
    }
};