const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "rep",
            enabled: true,
            runIn: ["text"],
            description: "Give someone a reputation point!",
            usage: "<user:usersearch> [note:str]", usageDelim: "|"
        });

        this.humanUse = "<user> [note]";
    }

    async run(msg, [user, note]) {
        if (user.id === msg.author.id) { return msg.sendLocale("DATACHECK_SAMEUSER"); }
        
        var data = this.client.dataManager("select", msg.author.id, "users");
        if (!data) { return msg.sendLocale("DATACHECK_NOACCOUNT"); }

        var tarData = this.client.dataManager("select", user.id, "users");
        if (!tarData) { return msg.sendLocale("DATACHECK_NOUSER"); }

        var cooldown = JSON.parse(data.cooldowns);
        if (cooldown.rep !== null && cooldown.rep + 86400000 > Date.now()) { return msg.sendLocale("DATACHECK_COOLDOWN"); }

        cooldown.rep = Date.now();

        this.client.dataManager("update", [`rep=${(tarData.rep + 1)}`, user.id], "users");
        this.client.dataManager("update", [`cooldowns='${JSON.stringify(cooldown)}'`, msg.author.id], "users");

        if (note && note.trim().length > 0) {
            user.send(`Delivery here! Someone has included a note with your rep!\n\n${note.join(" ")}\n-${msg.author.tag}`);
        }

        msg.sendLocale("REP", [msg, `<@${user.id}>`]);
    }
};