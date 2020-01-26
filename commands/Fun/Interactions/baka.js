const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "baka",
            enabled: true,
            runIn: ["text"],
            description: "For the stupid people",
            usage: "[user:usersearch]"
        });
    }

    async run(msg, [user]) {
        if (user === null) { return; }

        msg.channel.send(`Baka ${user.username}!`);
    }
};