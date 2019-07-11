const AniListNode = require("anilist-node");
const anilist = new AniListNode();

exports.run = async (client, msg, [term]) => {
    if (!term) { return msg.channel.send(client.speech(msg, ["manga", "noSearch"])); }
    var data = await anilist.search("manga", term, 1, 3);
    data = await anilist.media.manga(data.media[0].id);
    
    if (!msg.channel.nsfw && data.isAdult) { return msg.channel.send(client.speech(msg, ["manga, nsfw"])); }

    title = data.title.romaji + " ";

    if (data.title.english) { title = title + "| " + data.title.english; }

    chapCount = (data.status === "RELEASING") ? "" : `**Chapters:** ${data.chapters} - **Volumes:** ${data.volumes}\n`;

    const embed = new client.methods.Embed()
        .setTitle(title)
        .setColor(0x2E51A2)
        .setTimestamp()
        .setThumbnail(data.coverImage.medium)
        .setFooter("Data pulled from AniList");

    embed.setDescription(`[Anilist](${data.siteUrl}) | [MyAnimeList](https://myanimelist.net/anime/${data.idMal})\n\n**Format:** `
        + data.format.charAt(0) + data.format.substring(1).toLowerCase() + `\n**Released:** ${data.startDate.year}\n` + chapCount
        + "**Status:** " + data.status.charAt(0) + data.status.substring(1).toLowerCase() + "\n**Average Score:** " + data.meanScore 
        + " out of 100\n\n" + data.description.replace(/<br>/g, "").replace(/&mdash;/g, "-"));

    msg.channel.send({embed});
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"], 
    aliases: [],
    permLevel: 0,
    botPerms: ["ATTACH_FILES"],
    cooldown: 30
};
  
exports.help = {
    name: "manga",
    description: "Search for manga on AniList.",
    usage: "[term:str]", humanUse: "(Search term)",
    extendedHelp: "There is a 30 second cooldown for searches to not spam the site."
};