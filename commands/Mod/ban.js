const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "ban",
            enabled: true,
            runIn: ["text"],
            aliases: ["b"],
            permissionLevel: 6,
            description: "Ban someone",
            usage: "<user:usersearch> <reason:str>", usageDelim: ","
        });

        this.humanUse = "<user>, <reason>";
    }

    async run(msg, [user, reason=reason.trim()]) {
        user = msg.guild.members.cache.get(user.id);
        if (user.bannable === false) { return msg.reply(msg.language.get("BAN_UNBANNABLE")); }
        
        let { embed, DMembed } = this.client.util.modEmbed(msg, "ban", user, reason);
        
        if (embed.thumbnail) {
            await user.send({embed: DMembed});
            await user.ban(msg.language.get("MODRMESSAGE", [msg.author.username, reason]));
        }

        this.client.util.defaultChannel(msg.guild, "mod").send({embed: embed});
    }
};