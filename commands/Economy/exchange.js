const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "exchange",
            enabled: true,
            runIn: ["text"],
            cooldown: 10,
            aliases: [],
            description: "Give someone some of your credits",
            usage: "[user:usersearch] [credit:int]", usageDelim: " "
        });
    }

    async run(msg, [user, credit]) {
        if (user === null) { return; }
        if (user.id === msg.author.id) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "sameUser"])); }

        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noAccount"])); }
        if (data.credits < credit) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "lackCredits"])); }

        var tarData = this.client.dataManager("select", user.id, "users");
        if (!tarData) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noUser"])); }

        data.credits -= credit;
        tarData.credits += credit;

        this.client.dataManager("update", [`credits=${tarData.credits}`, user.id], "users");
        this.client.dataManager("update", [`credits=${data.credits}`, msg.author.id], "users");

        msg.channel.send(this.client.speech(msg, ["exchange"], [["-user1", msg.author.username], ["-user2", `<@${user.id}>`], ["-credit", credit]]));
    }
};