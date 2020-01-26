const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "presence",
            enabled: true,
            runIn: ["text", "dm"],
            permissionLevel: 9,
            description: "Set Margarine's status entirely",
            usage: "<online|idle|dnd|invisible> [game:str] [play|stream|listen|watch]",
            usageDelim: " | "
        });
    }

    async run(msg, [status, game, type="play"]) {
        this.client.util.presenceHelper(this.client, game, type, status);
    }
};