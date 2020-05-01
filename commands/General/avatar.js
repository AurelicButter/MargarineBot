const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "avatar",
            enabled: true,
            runIn: ["text"],
            requiredPermissions: ["ATTACH_FILES"],
            description: "Fetch a user's avatar!",
            usage: "<user:usersearch>"
        });
    }

    async run(msg, [user]) { msg.channel.send("", { files: [user.displayAvatarURL()]}); }
};