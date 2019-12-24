const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "choose",
            enabled: true,
            runIn: ["text"],
            cooldown: 0,
            aliases: ["choice"],
            description: "The one stop picker for hard choices!",
            usage: "[choice:str] [...]", usageDelim: " | "
        });
    }

    async run(msg, [...choice]) {
        if (choice.length < 2) { return msg.channel.send(client.speech(msg, ["choose", "lackChoice"])); }

        var numChoice = Math.floor(Math.random() * choice.length);
        msg.channel.send(this.client.speech(msg, ["choose", "success"], [["-user", msg.author.username], ["-result", choice[numChoice]]]));
    }
};