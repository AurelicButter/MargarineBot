const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const { duration } = require("moment");
require("moment-duration-format");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "nowplaying",
            aliases: ["np", "whatsplaying", "whatsplayingfam"],
            runIn: ["text"],
            requiredPermissions: ["EMBED_LINKS"],
            description: "See what's currently playing in VC."
        });
    }

    async run(msg) {
        const handler = this.client.music.get(msg.guild.id, "handler");
        if (!handler) { throw this.client.speech(msg, ["func-music", "general", "noQueue"]); }
        if (handler.queue.length < 1) { return this.client.speech(msg, ["nowplaying", "noQueue"]); }
        if (handler.state !== "PLAY") { return this.client.speech(msg, ["nowplaying", "notPlay"]); }
  
        let song = handler.queue[0];
        const embed = new MessageEmbed()
            .setColor(0x04d5fd)
            .setTimestamp()
            .setTitle(`📻 __${msg.guild.name}'s Music Stream__`)
            .setDescription("*Streaming all your requests from the fabulous library of Youtube.*")
            .addField("**Title:**", `[${song.title}](${song.url})`)
            .addField("**Requested by:**", song.requester, true)
            .addField("**Time Left:**", `${duration((song.seconds * 1000) - handler.dispatcher.streamTime).format("h:mm:ss", { trim: false })} out of ${duration(song.seconds * 1000).format("h:mm:ss", { trim: false })}`, true);

        msg.channel.send({embed});
    }
};