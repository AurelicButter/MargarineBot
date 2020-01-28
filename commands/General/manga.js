const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const AnilistNode = require("anilist-node");
const anilist = new AnilistNode();

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "manga",
            enabled: true,
            runIn: ["text"],
            cooldown: 30,
            requiredPermissions: ["ATTACH_FILES"],
            description: "Search for manga on AniList",
            usage: "[term:str]",
            extendedHelp: "There is a 60 second cooldown for each search to not spam the site."
        });
    }

    async run(msg, [term]) {
        if (!term) { return msg.channel.send(this.client.speech(msg, ["manga", "noSearch"])); }

        var data = await anilist.search("manga", term, 1, 3);
        if (!data || !data.media) { return msg.channel.send(this.client.speech(msg, ["manga", "searchErr"])); }
        data = await anilist.media.manga(data.media[0].id);

        if (!msg.channel.nsfw && data.isAdult) { return this.client.speech(msg, ["manga, nsfw"]); }

        var title = data.title.romaji;
        if (data.title.english) { title = `${title} | ${data.title.english}`; }

        var chapCount = (data.status === "RELEASING") ? "" : `**Chapters:** ${data.chapters} - **Volumes:** ${data.volumes}\n`;       
        var desc = `[Anilist](${data.siteUrl}) | [MyAnimeList](https://myanimelist.net/anime/${data.idMal})\n
        **Format:** ${data.format.charAt(0) + data.format.substring(1).toLowerCase()}\n**Released:** ${data.startDate.year}\n${chapCount}`;

        if (data.status === "NOT_YET_RELEASED") { 
            desc = `${desc}**Status:** Not yet released\n\n${data.description.replace(/<br>/g, "").replace(/<(i|\/i)>/g, "").replace(/&mdash;/g, "-")}`;
        } else {
            desc = `${desc}**Status:** ${data.status.charAt(0) + data.status.substring(1).toLowerCase()}
                **Average Score:** ${data.meanScore} out of 100\n\n${data.description.replace(/<br>/g, "").replace(/<(i|\/i)>/g, "").replace(/&mdash;/g, "-")}`;
        }

        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor(0x2E51A2)
            .setTimestamp()
            .setThumbnail(data.coverImage.medium)
            .setFooter("Data pulled from AniList")
            .setDescription(desc);
    
        msg.channel.send({embed});
    }
};