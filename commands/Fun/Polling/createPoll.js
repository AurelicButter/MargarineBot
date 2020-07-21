const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "createpoll",
            runIn: ["text"],
            description: "Create a new poll for the guild to vote on!",
            usage: "[title:str] [description:str] [options:str][...]", usageDelim: ",",
        });

        this.humanUse = "[title]_[description]_[...options]";
    }

    async run(msg, [title, desc, ...option]) {
        if (!title) { return msg.sendLocale("POLL_NOTITLE", [msg]); }
        if (!desc) { return msg.sendLocale("POLL_NODESC", [msg]); }
        if (option.length < 2) { return msg.sendLocale("POLL_NOOPTIONS", [msg]); }

        if (msg.guild.settings.poll.info) { return msg.sendLocale("POLL_NOCREATE", [msg]); }

        var votes = {};
        for (var x = 0; x < option.length; x++) { votes[x.toString()] = 0; }

        msg.guild.settings.update([
            ["poll.info", `${title.trim()}|${desc.trim()}`],
            ["poll.options", option],
            ["poll.votes", JSON.stringify(votes)]
        ]);

        msg.sendLocale("POLL_CREATED", [msg]);
    }
};