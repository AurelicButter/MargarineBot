const puppeteer = require("puppeteer");

exports.run = async (client, msg, [term]) => {
    const infoHelp = {
        terms: ["current", "plan", "finish", "drop", "pause"],
        anime: ["💚 Watching", "🗓 Planned", "💙 Completed", "💔 Dropped", "💛 Paused"],
        manga: ["📗 Reading", "🗓 Planned", "📘 Completed", "📕 Dropped", "📙 Paused"]
    };

    const url = "https://anilist.co/user/" + term;
    const info = { anime: {}, manga: {} }; terms = infoHelp.terms;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url + "/stats");
    await page.screenshot({path: "example.png"});
    await page.waitFor(2000);
    if (page.target()._targetInfo.url === "https://anilist.co/404") { return msg.channel.send("Whoops! Looks like a user by that name does not exist."); }

    var lists = await page.evaluate(() => {
        var aList = document.querySelector('#app > div.page-content > div > div.content.container > div > div.stats-wrap > div:nth-child(1) > div > div.chart > svg > g:nth-child(2) > g.ct-series.ct-series-a').innerHTML;
        var mList = document.querySelector('#app > div.page-content > div > div.content.container > div > div.stats-wrap > div:nth-child(1) > div > div.chart > svg > g:nth-child(2) > g.ct-series.ct-series-b').innerHTML;
        return [aList.split(">"), mList.split(">")];
    });

    await page.goto(url);

    var stats = await page.evaluate(() => {
        var ava = document.querySelector('#app > div.page-content > div > div.header-wrap > div.banner > div.container > div > img').getAttribute("src");
        var num = document.querySelector('#app > div.page-content > div > div.content.container > div > div:nth-child(2) > div.stats-wrap > div:nth-child(1) > div.stats-wrap').innerText.split(" ");
        var ber = document.querySelector('#app > div.page-content > div > div.content.container > div > div:nth-child(2) > div.stats-wrap > div:nth-child(2) > div.stats-wrap').innerText.split(" ");
        return [num[0].slice(0, -5), num[2].slice(6, -5), ber[0].slice(0, -9), ber[2].slice(6, -5), ava];
    });

    await browser.close();

    var y = 0; for (var x = 0; x < lists[0].length; x++) { if (!lists[0][x].startsWith("<") && lists[0][x].length > 1) { info.anime[terms[y]] = lists[0][x].slice(0, -6); y++ } }
    var y = 0; for (var x = 0; x < lists[1].length; x++) { if (!lists[1][x].startsWith("<") && lists[1][x].length > 1) { info.manga[terms[y]] = lists[1][x].slice(0, -6); y++ } }

    var aDisplay = []; var mDisplay = [];
    for (var x = 0; x < 5; x++) {
        if (info.anime.hasOwnProperty([terms[x]]) === false) { aDisplay.push(`${infoHelp.anime[x]}: 0`); }
        else { aDisplay.push(`${infoHelp.anime[x]}: ${info.anime[terms[x]]}`); }
    }

    for (var x = 0; x < 5; x++) {
        if (info.manga.hasOwnProperty([terms[x]]) === false) { mDisplay.push(`${infoHelp.manga[x]}: 0`); }
        else { mDisplay.push(`${infoHelp.manga[x]}: ${info.manga[terms[x]]}`); }
    }
    
    const embed = new client.methods.Embed()
        .setTitle(term + "'s AniList Profile")
        .setURL(url + term + "/")
        .setDescription("🕓 Watch Days: " + stats[0] + " | 📊 Anime Mean: " + stats[1] + "\n🔖 Manga Chapters: " + stats[2] + " | 📊 Manga Mean: " +  stats[3])
        .addField("__Anime:__", aDisplay, true)
        .addField("__Manga:__", mDisplay, true)
        .setTimestamp()
        .setColor(0x2E51A2)
        .setThumbnail(stats[4])
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
    description: "Fetch a user's profile on AniList",
    usage: "[term:str]",
    extendedHelp: "There is a 60 second cooldown for each profile search to not spam the site."
};