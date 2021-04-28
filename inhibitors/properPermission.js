const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {
    constructor(...args) {
        super(...args, {
            name: "properPermission",
            enabled: true
        });
    }

    //Checks if higher permission level users can use this command.
    //IE: Bot primary and secondary owners.
    async run(msg, cmd) {
        //Inhibitor is not meant for DM use or commands lower than 5 (Moderator level).
        if (!msg.guild || cmd.permissionLevel < 5) { return; }

        // Owner and Secondary level commands should not be blocked by the bot.
        if (cmd.permissionLevel === 9 || cmd.permissionLevel === 10) { return; }
        
        //Guild leaders have access to all mid-range permission level commands.
        if (msg.guild.owner.id === msg.author.id) { return; }

        let user = msg.guild.members.cache.get(msg.author.id);

        if (cmd.permissionLevel === 6 && user.permissions.has("ADMINISTRATOR")) { return; }

        if (cmd.permissionLevel === 5) {
            if (user.permissions.has("ADMINISTRATOR") || user.roles.cache.has(msg.guild.settings.modRole)) { return; }
        }

        throw true;
    }
};