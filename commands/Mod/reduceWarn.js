const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "reducewarn",
            enabled: true,
            runIn: ["text"],
            aliases: ["rw", "rmwarn"],
            permissionLevel: 5,
            requiredPermissions: ["EMBED_LINKS"],
            description: "Removes a certain amount of warns from the mentioned user's count",
            usage: "<user:usersearch> [amount:integercheck]", usageDelim: ",",
            extendedHelp: "If no amount is made, all warns will be cleared from the count"
        });

        this.humanUse = "<user>, [amount]";
    }

    async run(msg, [user, amount]) {
        user = msg.guild.members.cache.get(user.id);
        let warnlog = JSON.parse(msg.guild.settings.warnlog);

        if (!amount) { amount = warnlog[user.id]; }

        warnlog[user.id] -= amount;
        if (warnlog[user.id] < 1) { delete warnlog[user.id]; }

        let { embed } = this.client.util.modEmbed(msg, "rmwarn", user, msg.language.get("REDUCEWARN_REASON", [amount]));

        await msg.guild.settings.update("warnlog", JSON.stringify(warnlog));

        this.client.util.defaultChannel(msg.guild, "mod").send({embed: embed});
    }
};