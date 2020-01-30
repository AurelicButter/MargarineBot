const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "ban",
            enabled: true,
            runIn: ["text"],
            aliases: ["b"],
            permissionLevel: 6,
            description: "Ban someone.",
            usage: "<user:usersearch> <reason:str>", usageDelim: ","
        });
    }

    async run(msg, [user, reason]) {
        if (user === null) { return; }
        user = msg.guild.members.get(user.id);
        if (user.bannable === false) { return msg.reply("I cannot ban that member"); }
        
        var data = this.client.util.modEmbed(msg, "ban", user, reason);
        
        if (data.embed.thumbnail) {
            await user.send({embed: data.DMembed});
            await user.ban(`Automated Action - Moderator: ${msg.author.username} | Reason: ${reason}`);
        }

        this.client.util.defaultChannel(msg.guild, "mod").send({embed: data.embed});
    }
};