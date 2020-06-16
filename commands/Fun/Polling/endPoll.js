const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "endpoll",
            runIn: ["text"],
            description: "Close and finalize the guild's active poll.",
            extendedHelp: "Ending the poll will bring up the display one more time and then clear the poll."
        });
    }

    async run(msg) {
        var pollData = msg.guild.settings.poll;

        //No poll happening
        if (!pollData.info) { return msg.sendLocale("POLL_NOPOLL", [msg]); }
            
        var title = pollData.info.split("|")[0],
            desc = pollData.info.split("|")[1],
            votes = JSON.parse(pollData.votes),
            optionDisplay = ""
            header = `The poll has ended!\n__${title}__\n${desc}\n\n`;

        for (var x = 0; x < pollData.options.length; x++) {
            optionDisplay = optionDisplay.concat(`${x + 1}) ${pollData.options[x]}: ${votes[x]}\n`);
        }

        msg.channel.send(optionDisplay);
        msg.guild.settings.reset(["poll.info", "poll.options", "poll.votes", "poll.userVotes"]);
    }
};