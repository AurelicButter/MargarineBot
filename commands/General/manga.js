const fetch = require("node-fetch");

exports.run = async (client, msg, [term]) => {
    if (!term) { return msg.channel.send(client.speech(msg, ["manga", "noSearch"])); }
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ query: `query ($id: Int, $page: Int, $perPage: Int, $search: String) {
            Page (page: $page, perPage: $perPage) {
              media (id: $id, search: $search, type:MANGA) { id idMal title { romaji english } description isAdult
              coverImage { medium } siteUrl startDate { year } chapters volumes format status meanScore }
        } }`, variables: { search: term, page: 1, perPage: 3 } })
    };
    var response = await fetch("https://graphql.anilist.co", options);
    var json = await response.json();
    if (!json.data.Page.media) { return msg.channel.send(client.speech(msg, ["manga", "noResult"])); }

    const data = json.data.Page.media[0];
    
    if (!msg.channel.nsfw && data.isAdult) { return msg.channel.send(client.speech(msg, ["manga, nsfw"])); }

    title = data.title.romaji + " ";

    if (data.title.english) {
        title = title + "| " + data.title.english;
    }

    chapCount = (data.status === "RELEASING") ? "" : `**Chapters:** ${data.chapters} - **Volumes:** ${data.volumes}\n`;

    const embed = new client.methods.Embed()
        .setTitle(title)
        .setColor(0x2E51A2)
        .setTimestamp()
        .setThumbnail(data.coverImage.medium)
        .setFooter("Data pulled from AniList");

    embed.setDescription(`[Anilist](${data.siteUrl}) | [MyAnimeList](https://myanimelist.net/anime/${data.idMal})\n\n**Format:** `
        + data.format.charAt(0) + data.format.substring(1).toLowerCase() + `\n**Released:** ${data.startDate.year}\n` + chapCount
        + "**Status:** " + data.status.charAt(0) + data.status.substring(1).toLowerCase() + "**Average Score:** " + data.meanScore 
        + " out of 100\n\n" + data.description.replace(/<br>/g, "").replace(/&mdash;/g, "-"));

    msg.channel.send({embed});
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"], 
    aliases: [],
    permLevel: 10,
    botPerms: ["ATTACH_FILES"],
    cooldown: 30
};
  
exports.help = {
    name: "manga",
    description: "Search for manga on AniList.",
    usage: "[term:str]", humanUse: "(Search term)",
    extendedHelp: "There is a 30 second cooldown for searches to not spam the site."
};