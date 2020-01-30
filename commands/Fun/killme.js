const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "killme",
            enabled: true,
            runIn: ["text"],
            aliases: ["kms"],
            description: "Kill yourself with this command. Now comes with free revival!"
        });
    }

    async run(msg) {
        msg.channel.send(`${msg.author.username} has died.`).then(Message => {
            setTimeout(() => { Message.edit("Respawning..."); }, 1000);
            setTimeout(() => { Message.edit(`Revival complete. Welcome back, ${msg.author.username}`); }, 1000);
        });
    }
};