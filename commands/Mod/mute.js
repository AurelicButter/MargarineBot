const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "mute",
            enabled: true,
            runIn: ["text"],
            aliases: ["m"],
            permissionLevel: 5,
            description: "Mute someone.",
            extendedHelp: "Requires a server moderator to identify the mute role in the guild configurations first.",
            usage: "<user:usersearch> [reason:str]", usageDelim: ","
        });

        this.humanUse = "<user>, [reason]";
    }

    async run(msg, [user, reason=msg.language.get("NOREASON")]) {
        if (msg.guild.settings.muteRole === null) { return msg.sendLocale("MUTE_NOMUTEROLE", [msg]); }
        user = msg.guild.members.cache.get(user.id);

        let role = msg.guild.roles.cache.get(msg.guild.settings.muteRole);
        if (role.position > msg.guild.members.cache.get(this.client.user.id).roles.highest.position) { 
            return msg.sendLocale("MUTE_HIGHERPOS", [msg]);
        }

        if (msg.channel.permissionsFor(user).has("ADMINISTRATOR")) { //Admins can talk regardless
            msg.sendLocale("MUTE_ISADMIN", [msg]);
        }

        if (user.roles.cache.get(role.id)) { 
            let { embed, DMembed } = this.client.util.modEmbed(msg, "unmute", user, reason);
            user.roles.remove(role.id, msg.language.get("MODRMESSAGE", [msg.author.username, reason]));

            user.send({embed: DMembed});
            this.client.util.defaultChannel(msg.guild, "mod").send({embed: embed});

            return msg.sendLocale("MUTE_UNMUTED", [msg, user.user.username]);
        }

        let { embed, DMembed } = this.client.util.modEmbed(msg, "mute", user, reason);
        user.roles.add(role.id, msg.language.get("MODRMESSAGE", [msg.author.username, reason]));

        user.send({embed: DMembed});
        this.client.util.defaultChannel(msg.guild, "mod").send({embed: embed});
        
        msg.sendLocale("MUTE_MUTED", [msg, user.user.username]);
    }
};