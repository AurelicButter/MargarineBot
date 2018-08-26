const fetch = require("node-fetch");

exports.run = async (client, msg, [term]) => {
    var options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ query: `query ($name: String) { User(name: $name) { avatar { large } siteUrl
            stats { watchedTime chaptersRead animeListScores { meanScore } mangaListScores { meanScore }
                animeStatusDistribution { status amount } mangaStatusDistribution { status amount } }
        } }`, variables: { name: term } })
    };
    var response = await fetch('https://graphql.anilist.co', options);
    var json = await response.json();
    if (!json.data.User.stats) { return msg.channel.send("Anilist profile by that user is not found!"); }
    var data = json.data.User,
        anime = data.stats.animeStatusDistribution,
        manga = data.stats.mangaStatusDistribution;

    var animeL = ["💚 Watching: " + anime[0].amount, "🗓 Planned: " + anime[1].amount, "💙 Completed: " + anime[2].amount, "💔 Dropped: " + anime[3].amount, "💛 Paused: " + anime[4].amount];
    var mangaL = ["📗 Reading: " + manga[0].amount, "🗓 Planned: " + manga[1].amount, "📘 Completed: " + manga[2].amount, "📕 Dropped: " + manga[3].amount, "📙 Paused: " + manga[4].amount];

    const embed = new client.methods.Embed()
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
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: ["ATTACH_FILES"],
    cooldown: 60
};
  
exports.help = {
    name: "anilist",
    description: "Fetch a data's profile on AniList",
    usage: "[term:str]", humanUse: "(AniList profile name)",
    extendedHelp: "There is a 60 second cooldown for each profile search to not spam the site."
};