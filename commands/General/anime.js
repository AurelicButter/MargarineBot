const AniListNode = require("anilist-node");
const anilist = new AniListNode();

exports.run = async (client, msg, [term]) => {
    if (!term) { return msg.channel.send(client.speech(msg, ["anime", "noSearch"])); }
    var data = await anilist.search("anime", term, 1, 3);
    data = await anilist.media.anime(data.media[0].id);
    
    if (!msg.channel.nsfw && data.isAdult) { return msg.channel.send(client.speech(msg, ["anime, nsfw"])); }

    title = data.title.romaji + " ";

    if (data.title.english) { title = title + "| " + data.title.english; }

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
    permLevel: 0,
    botPerms: ["ATTACH_FILES"],
    cooldown: 30
};
  
exports.help = {
    name: "anime",
    description: "Search for anime on AniList.",
    usage: "[term:str]", humanUse: "(Search term)",
    extendedHelp: "There is a 30 second cooldown for searches to not spam the site."
};