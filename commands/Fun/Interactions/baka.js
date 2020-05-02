const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "baka",
            enabled: true,
            runIn: ["text"],
            description: "For the stupid people",
            usage: "<user:usersearch>"
        });

        this.humanUse = "<user>";
    }

    async run(msg, [user]) { msg.channel.send(`Baka ${user.username}!`); }
};