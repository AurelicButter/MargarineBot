const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const AnilistNode = require("anilist-node");
const anilist = new AnilistNode();

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "anilist",
            enabled: true,
            runIn: ["text"],
            cooldown: 60,
            aliases: [],
            requiredPermissions: ["ATTACH_FILES"],
            description: "Fetch a data's profile on AniList",
            usage: "[term:str]",
            extendedHelp: "There is a 60 second cooldown for each profile search to not spam the site."
        });
    }

    async run(msg, [term]) {
        if (!term) { return msg.channel.send(this.client.speech(msg, ["anilist"])); }

        var data = await anilist.user.all(term);

        if (data.status === 404) { return msg.channel.send("Anilist profile by that user is not found!"); }
        var anime = data.stats.animeStatusDistribution,
            manga = data.stats.mangaStatusDistribution;

        var animeL = ["💚 Watching: " + anime[0].amount, "🗓 Planned: " + anime[1].amount, "💙 Completed: " + anime[2].amount, "💔 Dropped: " + anime[3].amount, "💛 Paused: " + anime[4].amount];
        var mangaL = ["📗 Reading: " + manga[0].amount, "🗓 Planned: " + manga[1].amount, "📘 Completed: " + manga[2].amount, "📕 Dropped: " + manga[3].amount, "📙 Paused: " + manga[4].amount];

        const embed = new MessageEmbed()
            .setTitle(term + "'s AniList Profile")
            .setURL(data.siteUrl)
            .setDescription("🕓 Watch Days: " + Number(data.stats.watchedTime / 60 / 24).toFixed(1) + "\n🔖 Manga Chapters: " + data.stats.chaptersRead)
            .addField("__Anime:__", "📊 Mean Score: " + data.stats.animeListScores.meanScore + "\n" + animeL.join("\n"), true)
            .addField("__Manga:__", "📊 Mean Score: " +  data.stats.mangaListScores.meanScore + "\n" + mangaL.join("\n"), true)
            .setTimestamp()
            .setColor(0x2E51A2)
            .setThumbnail(data.avatar.large)
            .setFooter("Requested by: " + msg.author.tag);
    
        msg.channel.send({embed});
    }
};