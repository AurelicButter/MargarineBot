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
            usage: "<set|remove|search|user:usersearch> [username:str]", usageDelim: " ",
            extendedHelp: "Note: The user must set their own account name in Margarine in order to search by a Discord user. For general searching, use the search keyword before the username."
        });

        //Defaults to finding the user. If no user, send usersearch fail message as usage prevents the argument to post.
        this.customizeResponse("set", msg => msg.language.get("USERSEARCH_FAIL", [msg]));
    }

    async run(msg, [user, username]) {
        if (user === "set" || user === "remove") {
            var data = this.client.dataManager("select", msg.author.id, "users");
            if (!data) { return msg.sendLocale("DATACHECK_NOACCOUNT"); }

            var profiles = JSON.parse(data.profiles);
            profiles.Anilist = (user === "set") ? username : null;

            this.client.dataManager("update", [`profiles='${JSON.stringify(profiles)}'`, msg.author.id], "users");

            //Action success. Send message and return.
            if (user === "set") { return msg.sendLocale("ANILIST_SETPROFILE", [msg]); }
            return msg.sendLocale("ANILIST_REMOVEPROFILE", [msg]);
        }

        if (user === "search" & username === null) { return msg.sendLocale("ANILIST_NOTERM", [msg]); }
        if (user !== "search") { //Replace username value with stored AniList username in Margarine.
            var userData = this.client.dataManager("select", user.id, "users");
            if (!userData) { 
                if (user.id !== msg.author.id) { return msg.sendLocale("DATACHECK_NOUSER"); }
                return msg.sendLocale("DATACHECK_NOACCOUNT"); 
            }

            username = JSON.parse(userData.profiles).Anilist;
            if (!username) { return msg.sendLocale("ANILIST_NOUSER", [msg]); }
        }

        var data = await anilist.user.all(username);
        if (data.status === 404) { return msg.sendLocale("ANILIST_404ERR", [msg]); }

        const embed = new MessageEmbed()
            .setTitle(`${username}'s AniList Profile`)
            .setURL(data.siteUrl)
            .setTimestamp()
            .setColor(0x2E51A2)
            .setThumbnail(data.avatar.large)
            .setFooter(`Requested by: ${msg.author.tag}`);

        var anime = { "CURRENT": 0, "PLANNING": 0, "COMPLETED": 0, "DROPPED": 0, "PAUSED": 0 },
            manga = { "CURRENT": 0, "PLANNING": 0, "COMPLETED": 0, "DROPPED": 0, "PAUSED": 0 };

        data.statistics.anime.statuses.forEach((e) => { 
            if (e.status !== "REPEATING" || e.status !== "COMPLETED") { anime[e.status] = e.count; }
            else { anime["COMPLETED"] += e.count; }
        });

        data.statistics.manga.statuses.forEach((e) => {
            if (e.status !== "REPEATING" || e.status !== "COMPLETED") { manga[e.status] = e.count; }
            else { manga["COMPLETED"] += e.count; }
        });

        var animeL = [`💚 Watching: ${anime.CURRENT}`, `🗓 Planned: ${anime.PLANNING}`, `💙 Completed: ${anime.COMPLETED}`, `💔 Dropped: ${anime.DROPPED}`, `💛 Paused: ${anime.PAUSED}`];
        var mangaL = [`📗 Reading: ${manga.CURRENT}`, `🗓 Planned: ${manga.PLANNING}`, `📘 Completed: ${manga.COMPLETED}`, `📕 Dropped: ${manga.DROPPED}`, `📙 Paused: ${manga.PAUSED}`];

        embed.setDescription(`🕓 Watch Days: ${Number(data.statistics.anime.minutesWatched / 60 / 24).toFixed(1)}\n🔖 Manga Chapters: ${data.statistics.manga.chaptersRead}`)
            .addField("__Anime:__", `📊 Mean Score: ${data.statistics.anime.meanScore}\n${animeL.join("\n")}`, true)
            .addField("__Manga:__", `📊 Mean Score: ${data.statistics.manga.meanScore}\n${mangaL.join("\n")}`, true);
    
        msg.channel.send({embed});
    }
};