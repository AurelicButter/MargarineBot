const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const AnilistNode = require("anilist-node");
const anilist = new AnilistNode();

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "anime",
            enabled: true,
            runIn: ["text"],
            cooldown: 30,
            requiredPermissions: ["ATTACH_FILES"],
            description: "Search for anime on AniList",
            usage: "<term:str>",
            extendedHelp: "There is a 60 second cooldown for each search to not spam the site."
        });

        this.customizeResponse("term", msg => msg.language.get("ANIME_NOTERM", [msg]));
    }

    async run(msg, [term]) {
        var data = await anilist.search("anime", term, 1, 3);
        if (!data || !data.media) { return msg.sendLocale("ANIME_SEARCHERR", [msg]); }
        if (data.media.length === 0) { return msg.sendLocale("ANIME_NORESULT", [msg]); }
        data = await anilist.media.anime(data.media[0].id);

        if (!msg.channel.nsfw && data.isAdult) { return msg.sendLocale("ANIME_NSFW", [msg]); }

        var title = data.title.romaji;
        if (data.title.english) { title = `${title} | ${data.title.english}`; }

        var desc = `[Anilist](${data.siteUrl}) | [MyAnimeList](https://myanimelist.net/anime/${data.idMal})\n\n**Format:** `;
        var time = (data.season) ? `${this.client.util.toTitleCase(data.season)} ${data.startDate.year}` : "To be announced";

        if (data.format === "TV_SHORT") { data.format = "TV Short"; }
        if (data.format === "SPECIAL") { data.format = "Special"; }
        if (data.episodes === null) { data.episodes = "No episode count found"; }

        var duration = (data.duration === null) ? "" : `${data.duration} minutes`;

        if (data.format === "MOVIE") {
            desc = `${desc}Movie \n**Released:** ${time}\n**Runtime:** ${duration}\n`;
        } else {
            desc = `${desc}${data.format}\n**Season:** ${time}\n**Episodes:** ${data.episodes}`;
            if (duration.length > 1) { desc = `${desc} (${duration} per episode)`; }
            desc = `${desc}\n`;
        }

        if (data.status === "NOT_YET_RELEASED") { 
            desc = `${desc}**Status:** Not yet released\n\n${data.description.replace(/<br>/g, "").replace(/<(i|\/i)>/g, "")}`;
        } else {
            desc = `${desc}**Status:** ${this.client.util.toTitleCase(data.status)}
                **Average Score:** ${data.meanScore} out of 100\n\n${data.description.replace(/<br>/g, "").replace(/<(i|\/i)>/g, "")}`;
        }

        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor(0x2E51A2)
            .setTimestamp()
            .setDescription(desc)
            .setThumbnail(data.coverImage.medium)
            .setFooter("Data pulled from AniList");
    
        msg.channel.send({embed});
    }
};