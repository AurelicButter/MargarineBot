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
    }

    async run(msg, [user, reason="No reason given."]) {
        if (user === null) { return; }
        if (msg.guild.settings.muteRole === null) { return msg.channel.send(this.client.speech(msg, ["mute", "noRole"])); }
        user = msg.guild.members.cache.get(user.id);

        var role = msg.guild.roles.cache.get(msg.guild.settings.muteRole);
        if (role.position > msg.guild.members.cache.get(this.client.user.id).roles.highest.position) { return msg.channel.send(this.client.speech(msg, ["mute", "rolePos"])); }

        if (msg.channel.permissionsFor(user).has("ADMINISTRATOR")) { //Admins can talk regardless. Send message to warn that it will not work.
            msg.channel.send(this.client.speech(msg, ["mute", "admin"]));
        }

        if (user.roles.cache.get(role.id)) { 
            var data = this.client.util.modEmbed(msg, "unmute", user, reason);
            user.roles.remove(role.id, `Automated Action - Moderator: ${msg.author.username} | ${reason}`);

            //Send embeds to logs and target user.
            user.send({embed: data.DMembed});
            this.client.util.defaultChannel(msg.guild, "mod").send({embed: data.embed});

            return msg.channel.send(this.client.speech(msg, ["mute", "unmuted"], [["-user", user.user.username]]));
        }

        var data = this.client.util.modEmbed(msg, "mute", user, reason);
        user.roles.add(role.id, `Automated Action - Moderator: ${msg.author.username} | ${reason}`);

        //Send embeds to logs and target user.
        user.send({embed: data.DMembed});
        this.client.util.defaultChannel(msg.guild, "mod").send({embed: data.embed});
        
        msg.channel.send(this.client.speech(msg, ["mute", "muted"], [["-user", user.user.username]]));
    }
};