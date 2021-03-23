const { Event } = require("klasa");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            enabled: true,
            name: 'guildMemberRemove'
        });
    }

    run(member) {
        const leaveMsg = member.guild.settings.leaveMsg;
        const leaveChannel = member.guild.channels.cache.get(member.guild.settings.defaultChannel);
        if (!leaveMsg || !leaveChannel) { return; } // No message/channel set, return.

        leaveChannel.send(
            leaveMsg.replace("-pinguser", `<@!${member.id}>`)
                .replace("-servername", member.guild.name)
                .replace("-userid", member.id)
                .replace("-username", member.user.username)
        );
    }
};