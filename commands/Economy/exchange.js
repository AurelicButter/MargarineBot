const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "exchange",
            enabled: true,
            runIn: ["text"],
            cooldown: 10,
            description: "Give someone some of your credits",
            usage: "<user:usersearch> [credit:intcheck{1,}]", usageDelim: " "
        });

        this.humanUse = "<user> <credit (1 or greater)>";
    }

    async run(msg, [user, credit]) {
        if (user.id === msg.author.id) { return msg.sendLocale("DATACHECK_SAMEUSER"); }

        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.sendLocale("DATACHECK_NOACCOUNT"); }
        if (data.credits < credit) { return msg.sendLocale("DATACHECK_LACKCREDIT"); }

        var tarData = this.client.dataManager("select", user.id, "users");
        if (!tarData) { return msg.sendLocale("DATACHECK_NOUSER"); }

        data.credits -= credit;
        tarData.credits += credit;

        this.client.dataManager("update", [`credits=${tarData.credits}`, user.id], "users");
        this.client.dataManager("update", [`credits=${data.credits}`, msg.author.id], "users");

        msg.channel.send(this.client.speech(msg, ["exchange"], [["-user1", msg.author.username], ["-user2", `<@${user.id}>`], ["-credit", credit]]));
    }
};