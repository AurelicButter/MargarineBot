const { Event } = require("klasa");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            enabled: true,
            name: "guildMemberRemove"
        });
    }

    async run(member) {
        const leaveMsg = member.guild.settings.leaveMsg;
        const leaveChannel = member.guild.channels.cache.get(member.guild.settings.defaultChannel);
        let warnlog = JSON.parse(member.guild.settings.warnlog);

        if (warnlog[member.id]) {
            delete warnlog[member.id];
            await member.guild.settings.update("warnlog", JSON.stringify(warnlog));
        }

        if (!leaveMsg || !leaveChannel) { return; } // No message/channel set, return.

        leaveChannel.send(
            leaveMsg.replace("-pinguser", `<@!${member.id}>`)
                .replace("-servername", member.guild.name)
                .replace("-userid", member.id)
                .replace("-username", member.user.username)
        );
    }
};