const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "kick",
            enabled: true,
            runIn: ["text"],
            aliases: ["k"],
            permissionLevel: 5,
            requiredPermissions: ["KICK_MEMBERS", "EMBED_LINKS"],
            description: "Kicks the mentioned user",
            usage: "<user:usersearch> <reason:str>", usageDelim: ","
        });

        this.humanUse = "<user>, <reason>";
    }

    async run(msg, [user, reason=reason.trim()]) {
        user = msg.guild.members.cache.get(user.id);
        if (user.kickable === false) { return msg.reply(msg.language.get("KICK_UNKICKABLE")); }
        
        let { embed, DMembed } = this.client.util.modEmbed(msg, "kick", user, reason);
        
        if (embed.thumbnail) {
            await user.send({embed: DMembed});
            await user.kick(msg.language.get("MODRMESSAGE", [msg.author.username, reason]));
        }

        this.client.util.defaultChannel(msg.guild, "mod").send({embed: embed});
    }
};