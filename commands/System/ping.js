const { Command } = require('klasa');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'ping',
            runIn: ['text', 'dm'],
            aliases: [],
            guarded: true,
            description: 'Ping/Pong command',
            usage: ""
        });
    }

    async run(message) {
        const msg = await message.channel.send("Pinging...");
        await msg.edit(`🎉 Pong! (Took: ${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms.) 🎉`)
    }
};