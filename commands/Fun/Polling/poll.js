const { Command, Possible } = require("klasa");
const { poll } = require("../../../assets/speech/en-CA/fun");

function pollDisplay(pollData, ending) {
    var title = pollData.info.split("|")[0],
        desc = pollData.info.split("|")[1],
        votes = JSON.parse(pollData.votes),
        optionDisplay = ""
        header = `__${title}__\n${desc}\n\n`;

    for (var x = 0; x < pollData.options.length; x++) {
        optionDisplay = optionDisplay.concat(`${x + 1}) ${pollData.options[x]}: ${votes[x]}\n`);
    }

    if (ending) { header = "The poll has ended!\n" + header; } 

    return header + optionDisplay;
};

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "poll",
            runIn: ["text"],
            subcommands: true,
            description: "Poll users and decide what's the best option!",
            usage: "<new|vote|end|show:default> [title:str] [description:str] [options:str][...]", usageDelim: ",",
            extendedHelp: "Note: end will bring up the display one more time and then clear the poll."
        });

        this.humanUse = "";
    }

    async new(msg, [title, desc, ...option]) {
        if (!title) { return msg.sendLocale("POLL_NOTITLE", [msg]); }
        if (!desc) { return msg.sendLocale("POLL_NODESC", [msg]); }
        if (option.length < 2) { return msg.sendLocale("POLL_NOOPTION", [msg]); }

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

    async vote(msg, [option]) {
        //Can't use integerCheck in the usage alongside title. Run the argument within the vote method instead.
        //Method will stop automatically if integerCheck detects a bad number.
        option = await this.client.arguments.get("integerCheck").run(option, new Possible([, "option", "integercheck", 1, undefined, undefined]), msg);
        option--; //Reduce option by one to work with array index of 0.

        var pollData = msg.guild.settings.poll,
            userResults = JSON.parse(pollData.userVotes),
            voteTotal = JSON.parse(pollData.votes);

        if (Object.keys(userResults).includes(msg.author.id)) {
            var previousVote = userResults[msg.author.id];
            voteTotal[previousVote]--;
        }

        userResults[msg.author.id] = option;
        voteTotal[option]++;

        msg.guild.settings.update([
            ["poll.votes", JSON.stringify(voteTotal)],
            ["poll.userVotes", JSON.stringify(userResults)]
        ]);

        msg.sendLocale("POLL_VOTED", [msg, pollData.options[option]]);
    }

    async end(msg) {
        var pollData = msg.guild.settings.poll;

        //No poll happening
        if (!pollData.info) { return msg.sendLocale("POLL_NOPOLL", [msg]); }

        msg.channel.send(pollDisplay(pollData, true));
        msg.guild.settings.reset(["poll.info", "poll.options", "poll.votes", "poll.userVotes"]);
    }

    async show(msg) {
        var pollData = msg.guild.settings.poll;
        //No poll happening
        if (!pollData.info) { return msg.sendLocale("POLL_NOPOLL", [msg]); }

        msg.channel.send(pollDisplay(pollData));
    }
};