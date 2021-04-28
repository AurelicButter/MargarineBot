const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "setavatar",
            enabled: true,
            runIn: ["text", "dm"],
            permissionLevel: 9,
            description: "Set Margarine's avatar",
            usage: "[image:str]"
        });
    }

    async run(msg, [image]) {
        this.client.user.setAvatar(image);

        msg.sendLocale("AVATAR_UPDATE");
    }
};