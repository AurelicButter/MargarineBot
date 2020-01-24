const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "say",
            runIn: ["text"],
            aliases: ["echo", "talk"],
            description: "Have Margarine echo what you said.",
            usage: "[message:str]"
        });
    }

    async run(msg, [message]) {
        if (!message) { return msg.channel.send(this.client.speech(msg, ["say"])); }
    
        msg.delete().catch();
        if (msg.author.id === client.owner.id) { return msg.channel.send(message); }
        msg.channel.send(`${msg.author.username} (${msg.author.id}) wanted to say: ${message}`);    
    }
};