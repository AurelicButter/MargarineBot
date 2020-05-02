const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "greet",
            enabled: true,
            runIn: ["text"],
            description: "Have Margarine greet you or someone with a hello!",
            usage: "<user:usersearch>"
        });

        this.humanUse = "<user>";
    }

    async run(msg, [user]) {      
        if (user.id === this.client.user.id) { return msg.sendLocale("GREET_MYSELF", [msg, msg.author.username]); }

        msg.sendLocale("GREET_SOMEONE", [msg, user.username]);
    }
};