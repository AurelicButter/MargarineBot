const { Command, Possible } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "vote",
            runIn: ["text"],
            description: "Vote in the active poll!",
            usage: "[option:str]"
        });

        this.humanUse = "[option number]";
    }

    async run(msg, [option]) {
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
};