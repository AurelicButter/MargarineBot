const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "warn",
            enabled: true,
            runIn: ["text"],
            aliases: ["w"],
            permissionLevel: 5,
            requiredPermissions: ["EMBED_LINKS"],
            description: "Warns the mentioned user",
            usage: "<user:usersearch> <reason:str>", usageDelim: ","
        });

        this.humanUse = "<user>, <reason>";
    }

    async run(msg, [user, reason=reason.trim()]) {
        user = msg.guild.members.cache.get(user.id);
        let { embed } = this.client.util.modEmbed(msg, "warn", user, reason);
        let warnlog = JSON.parse(msg.guild.settings.warnlog);

        if (warnlog[user.id]) {
            warnlog[user.id]++;
        } else {
            warnlog[user.id] = 1;
        }

        await msg.guild.settings.update("warnlog", JSON.stringify(warnlog)); 

        this.client.util.defaultChannel(msg.guild, "mod").send({embed: embed});
    }
};