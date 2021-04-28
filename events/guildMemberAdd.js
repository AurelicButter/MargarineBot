const { Event } = require("klasa");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            enabled: true,
            name: "guildMemberAdd"
        });
    }

    run(member) {
        const welcomeMsg = member.guild.settings.welcomeMsg;
        const welcomeChannel = member.guild.channels.cache.get(member.guild.settings.defaultChannel);
        if (!welcomeMsg || !welcomeChannel) { return; } // No message/channel set, return.

        welcomeChannel.send(
            welcomeMsg.replace("-pinguser", `<@!${member.id}>`)
                .replace("-servername", member.guild.name)
                .replace("-userid", member.id)
                .replace("-username", member.user.username)
        );
    }
};