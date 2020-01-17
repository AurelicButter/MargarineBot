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
            requiredPermissions: ["ATTACH_FILES"],
            description: "Fetch a someone's profile on AniList.",
            usage: "[set|search|user:usersearch] [username:str]", usageDelim: " ",
            extendedHelp: "Note: The user must set their own account name in Margarine in order to search by a Discord user. For general searching, use the search keyword before the username."
        });
    }

    async run(msg, [user, username]) {
        if (user === "set") {
            var data = this.client.dataManager("select", msg.author.id, "users");
            if (!data) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noAccount"])); }

            var profiles = JSON.parse(data.profiles);
            profiles.Anilist = username;

            this.client.dataManager("update", [`profiles='${JSON.stringify(profiles)}'`, msg.author.id], "users");
            return msg.channel.send(this.client.speech(msg, ["anilist", "setProfile"])); //Success of setting profile.
        }

        if (user === null) { return; } //Return for failed usersearch.
        if (user === "search" & username === null) { return msg.channel.send(this.client.speech(msg, ["anilist", "noTerm"])); }
        if (user !== "search") { //Replace username value with stored AniList username in Margarine.
            var userData = this.client.dataManager("select", user.id, "users");
            if (!userData) { 
                if (user.id !== msg.author.id) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noUser"])); }
                return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noAccount"])); 
            }

            username = JSON.parse(userData.profiles).Anilist;
            if (!username) { return msg.channel.send(this.client.speech(msg, ["anilist", "noUsername"])); }
        }

        var data = await anilist.user.all(username);

        if (data.status === 404) { return msg.channel.send(this.client.speech(msg, ["anilist", "404Err"])); }
        var anime = data.stats.animeStatusDistribution,
            manga = data.stats.mangaStatusDistribution;

        var animeL = [`💚 Watching: ${anime[0].amount}`, `🗓 Planned: ${anime[1].amount}`, `💙 Completed: ${anime[2].amount}`, `💔 Dropped: ${anime[3].amount}`, `💛 Paused: ${anime[4].amount}`];
        var mangaL = [`📗 Reading: ${manga[0].amount}`, `🗓 Planned: ${manga[1].amount}`, `📘 Completed: ${manga[2].amount}`, `📕 Dropped: ${manga[3].amount}`, `📙 Paused: ${manga[4].amount}`];

        const embed = new MessageEmbed()
            .setTitle(`${username}'s AniList Profile`)
            .setURL(data.siteUrl)
            .setDescription(`🕓 Watch Days: ${Number(data.stats.watchedTime / 60 / 24).toFixed(1)}\n🔖 Manga Chapters: ${data.stats.chaptersRead}`)
            .addField("__Anime:__", `📊 Mean Score: ${data.stats.animeListScores.meanScore}\n${animeL.join("\n")}`, true)
            .addField("__Manga:__", `📊 Mean Score: ${data.stats.mangaListScores.meanScore}\n${mangaL.join("\n")}`, true)
            .setTimestamp()
            .setColor(0x2E51A2)
            .setThumbnail(data.avatar.large)
            .setFooter(`Requested by: ${msg.author.tag}`);
    
        msg.channel.send({embed});
    }
};