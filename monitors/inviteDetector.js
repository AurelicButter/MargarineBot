const { Monitor } = require("klasa");
const inviteRegex = /discord(.gg|.com\/invite)\/.{1,}/;

module.exports = class extends Monitor {
    constructor(...args) {
        super(...args, {
            name: "inviteDetector",
            enabled: true,
            ignoreEdits: false,
            ignoreOthers: false,
            ignoreBots: false,
            ignoreSelf: false,
            ignoreBlacklistedUsers: false
        });
    }

    run(msg) {
        let guildActive = msg.guild.settings.monitors.inviteDetector;

        if (!guildActive || !inviteRegex.test(msg.content)) { return; }

        msg.delete();
        msg.sendLocale("INVITEDETECTOR_BADMESSAGE", [msg, msg.author.id]);
    }
};