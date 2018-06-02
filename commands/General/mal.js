const cheerio = require("cheerio");
const request = require("request");

exports.run = async (client, msg, [term]) => {
    const url = "https://myanimelist.net/profile/";

    request(url + term, function(err, res, body) {
        $ = cheerio.load(body);
        var text = $.text().split(" "); var x = 0; var info = new Object();
        info.aStats = new Object(); info.mStats = new Object();

        do {
            var z = text[x].trim(); var y = text[x + 1] ? text[x + 1].trim() : ""; var zed = text[x + 2] ? text[x + 2].trim() : "";
            if (z + y + zed === "404NotFound") { return msg.channel.send("Whoops! Looks like a user by that name does not exist."); }
            else if (z.length > 1) {
                if (z.startsWith("Online")) {
                    if (zed.startsWith("ago")) { info.status = z.slice(6) + " " + y + " ago"; }
                    else if (z.startsWith("OnlineNow")) { info.status = z.slice(6, z.search("Gender")); }
                    else if (zed.includes(":")) { info.status = z.slice(6) + " " + y + " " + (new Date()).getFullYear(); }
                    else if (z.includes("Yesterday") || z.includes("Today") && zed.slice(1, 2) === "M") { 
                        info.status = z.slice(6, -1) + " at " + y + zed.slice(0, 2); 
                    }
                    else if (isNaN(zed) === false) { info.status = z.slice(6) + " " + y + " " + zed; }
                } if (z.includes("Birthday") && !info.birthday) {
                    if (y.includes("Location")) {
                        var num = (z.length - z.search("Birthday")) * (-1);
                        var baka = y.slice(0, y.search("Location"));
                    } else {
                        var num = (z.length - z.search("Birthday")) * (-1);
                        var baka = y.slice(-1) === "," ? y + " " + zed.slice(0, 4) : y;
                    }
                    info.birthday = z.slice(num + 8) + " " + baka;
                } if (z.includes("Gender")) {
                    var amount = (z.search("Birthday")) ? z.search("Birthday") : null;

                    if (z.startsWith("ago")) { var amount2 = 9; }
                    else if (z.startsWith("AM") || z.startsWith("PM")) { var amount2 = 8; }
                    else { var amount2 = 15; } 

                    info.gender = z.slice(amount2, amount);
                } else if (z.startsWith("Watching") || z.startsWith("Reading")) {
                    if (!info.aStats.watch || !info.mStats.read) {
                        var num = [z.search("Completed"), z.search("On-Hold"), z.search("Dropped")];

                        var butter = !info.aStats.watch ? "aStats" : "mStats";
                        info[butter].completed = z.slice(num[0] + 9, num[1]);
                        info[butter].hold = z.slice(num[1] + 7, num[2]);
                        info[butter].drop = z.slice(num[2] + 7, -4);

                        if (butter === "aStats") { 
                            info.aStats.watch = z.slice(8, num[0]); 
                            info.aStats.plan = zed.slice(5, -5);
                        }
                        else { 
                            info.mStats.read = z.slice(7, num[0]); 
                            info.mStats.plan = zed.slice(4, -5);
                        }
                    }
                } else if (z === "All" && !info.friends) { info.friends = y.slice(1, -8); }
                else if (isNaN(y) === false) {
                    if (z === "Days:") { 
                        if (!info.aStats.days) { info.aStats.days = y; }
                        else { info.mStats.days = y; }
                    } 
                    else if (z === "Score:") {
                        if (!info.aStats.mean) { info.aStats.mean = y; }
                        else { info.mStats.mean = y; }
                    }
                }
            }
            x++;
        } while (x < text.length);

        var list = [];
        if (info.gender) { list.push("🚻 Gender: " + info.gender); }
        if (info.birthday) { list.push("🎂 Birthday: " + info.birthday); }
        if (info.friends) { list.push("👫 Friends: " + info.friends); }

        const embed = new client.methods.Embed()
            .setTitle(term + "'s MAL Profile")
            .setURL(url + term)
            .setDescription("Last online: " + info.status);
            if (list.length > 0) { embed.addField("__General:__", list.join("\n")); }
            embed.addField("__Anime:__", "🕓 Days: " + info.aStats.days + " | 📊 Mean: " + info.aStats.mean + "\n💚 Watching: " + info.aStats.watch + "\n💙 Completed: " + info.aStats.completed + "\n💛 On-Hold: " + info.aStats.hold + "\n💔 Dropped: " + info.aStats.drop + "\n🗓 Plan-to-Watch: " + info.aStats.plan, true)
            .addField("__Manga:__", "🕓 Days: " + info.mStats.days + " | 📊 Mean: " + info.mStats.mean + "\n📗 Reading: " + info.mStats.read + "\n📘 Completed: " + info.mStats.completed + "\n📙 On-Hold: " + info.mStats.hold + "\n📕 Dropped: " + info.mStats.drop + "\n🗓 Plan-to-Read: " + info.mStats.plan, true)
            .setTimestamp()
            .setColor(0x2E51A2)
            .setThumbnail($(".user-image").find("img")[0].attribs.src)
            .setFooter("Requested by: " + msg.author.tag);

        msg.channel.send({embed});
    });    
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
    name: "mal",
    description: "Fetch a user's profile on MyAnimeList",
    usage: "[term:str]",
    extendedHelp: "There is a 30 second cooldown for each profile search to not spam the MAL site."
};