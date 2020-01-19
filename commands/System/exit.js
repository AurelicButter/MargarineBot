const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "exit",
            runIn: ["text", "dm"],
            aliases: ["shutdown", "sleep"],
            guarded: true,
            permissionLevel: 10,
            description: "Shuts down the bot."
        });
    }

    async run(msg) {
        await msg.delete().catch();
        await msg.channel.send(`Good night, ${this.client.owner.username}!`);
        await process.exit().catch((e) => { console.error(e); });
    }
};