const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "roll",
            runIn: ["text"],
            description: "Roll a die. Will default to 6 if no amount is provided.",
            usage: "[sides:int]"
        });
    }

    async run(msg, [sides=6]) {
        if (sides === 0) { return msg.channel.send(this.client.speech(msg, ["roll", "zero"])); }
        if (sides < 0) { return msg.channel.send(this.client.speech(msg, ["roll", "negative"])); }

        var y = Math.floor(Math.random() * (Math.floor(sides) - Math.ceil(1) + 1)) + Math.ceil(1);
        msg.channel.send(this.client.speech(msg, ["roll", "success"]).replace("-value", y)); 
    }
};