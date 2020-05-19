const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "invite",
            runIn: ["text", "dm"],
            guarded: true,
            description: "Displays the invite link for Margarine."
        });
    }

    async run(msg) { msg.sendLocale("INVITE", [this.client.invite]); }
};