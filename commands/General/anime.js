const fetch = require("node-fetch");

exports.run = async (client, msg, [term]) => {
    if (!term) { return msg.channel.send(client.speech(msg, ["anime", "noSearch"])); }
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ query: `query ($id: Int, $page: Int, $perPage: Int, $search: String) {
            Page (page: $page, perPage: $perPage) {
              media (id: $id, search: $search, type:ANIME) { id idMal title { romaji english } description isAdult
              coverImage { medium } siteUrl season startDate { year } episodes duration format status meanScore }
        } }`, variables: { search: term, page: 1, perPage: 3 } })
    };
    var response = await fetch("https://graphql.anilist.co", options);
    var json = await response.json();
    if (!json.data.Page.media) { return msg.channel.send(client.speech(msg, ["anime", "noResult"])); }

    const data = json.data.Page.media[0];
    
    if (!msg.channel.nsfw && data.isAdult) { return msg.channel.send(client.speech(msg, ["anime, nsfw"])); }

    title = data.title.romaji + " ";

    if (data.title.english) {
        title = title + "| " + data.title.english;
    }

    const embed = new client.methods.Embed()
        .setTitle(title)
        .setColor(0x2E51A2)
        .setTimestamp()
        .setThumbnail(data.coverImage.medium)
        .setFooter("Data pulled from AniList");

    desc = `[Anilist](${data.siteUrl}) | [MyAnimeList](https://myanimelist.net/anime/${data.idMal})\n\n**Format:** `;
    time = data.season.charAt(0) + data.season.substring(1).toLowerCase() + " " + data.startDate.year;

    if (data.format === "MOVIE") {
        desc = desc + data.format.charAt(0) + data.format.substring(1).toLowerCase() + `\n**Released:** ${time}\n**Runtime:** ${data.duration} minutes\n`;
    }
    else {
        desc = desc + `${data.format}\n**Season:** ${time}\n**Episodes:** ${data.episodes} (${data.duration} minutes per episode)\n`;
    }

    desc = desc + `**Status:** ${data.status.charAt(0) + data.status.substring(1).toLowerCase()}
        **Average Score:** ${data.meanScore} out of 100\n\n${data.description.replace(/<br>/g, "")}`;

    embed.setDescription(desc);
    
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
    name: "anime",
    description: "Search for anime on AniList.",
    usage: "[term:str]", humanUse: "(Search term)",
    extendedHelp: "There is a 30 second cooldown for searches to not spam the site."
};