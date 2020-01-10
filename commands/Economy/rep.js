const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "rep",
            enabled: true,
            runIn: ["text"],
            aliases: [],
            description: "Give someone a reputation point!",
            usage: "[user:usersearch] [note:str]", usageDelim: "|"
        });
    }

    async run(msg, [user, note]) {
        if (user == null) { return; }
        if (user.id === msg.author.id) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "sameUser"])); }
        
        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noAccount"])); }

        var tarData = this.client.dataManager("select", user.id, "users");
        if (!tarData) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noUser"])); }

        var cooldown = JSON.parse(data.cooldowns);
        if (cooldown.rep !== null && cooldown.rep + 86400000 > Date.now()) {
            return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "cooldown"]));
        }

        cooldown.rep = Date.now();

        this.client.dataManager("update", ["rep=" + (tarData.rep + 1), user.id], "users");
        this.client.dataManager("update", ["cooldowns='" + JSON.stringify(cooldown) + "'", msg.author.id], "users");

        if (note && note.trim().length > 0) {
            user.send("Delivery here! Someone has included a note with your rep!\n\n" + note.join(" ") + "\n-" + msg.author.tag);
        }

        msg.channel.send(this.client.speech(msg, ["rep"], [["-mention", "<@" + user.id + ">"]]));
    }
};