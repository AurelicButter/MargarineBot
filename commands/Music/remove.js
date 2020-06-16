const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "remove",
            runIn: ["text"],
            description: "Removes a song from the queue.",
            usage: "[songID:int]"
        });
    }

    async run(msg, [songID=songID - 1]) {
        var handler = this.client.util.musicCheck(msg);
        if (handler === false) { return; }
        if (songID === 0) { return this.client.commands.get("skip").run(msg); }
        
        var title = handler.queue[songID].title;
        handler.queue.splice(songID, 1);
        msg.sendLocale("REMOVEMUSIC", [msg, title]);
    }
};