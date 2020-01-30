const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const cheerio = require("cheerio");
const request = require("request");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "mal",
            enabled: true,
            runIn: ["text"],
            cooldown: 60,
            requiredPermissions: ["ATTACH_FILES"],
            description: "Fetch a user's profile on MyAnimeList",
            usage: "[set|remove|search|user:usersearch] [username:str]", usageDelim: " ",
            extendedHelp: "Note: The user must set their own account name in Margarine in order to search by a Discord user. For general searching, use the search keyword before the username."
        });
    }

    async run(msg, [user, username]) {
        if (user === "set" || user === "remove") {
            var data = this.client.dataManager("select", msg.author.id, "users");
            if (!data) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noAccount"])); }

            var profiles = JSON.parse(data.profiles);
            profiles.MAL = (user === "set") ? username : null;

            this.client.dataManager("update", [`profiles='${JSON.stringify(profiles)}'`, msg.author.id], "users");
            
            if (user === "set") { return msg.channel.send(this.client.speech(msg, ["mal", "setProfile"])); }
            if (user === "remove") { return msg.channel.send(this.client.speech(msg, ["mal", "removeProfile"])); }
        }

        if (user === null) { return; } //Return for failed usersearch.
        if (user === "search" & username === null) { return msg.channel.send(this.client.speech(msg, ["mal", "noTerm"])); }
        if (user !== "search") { //Replace username value with stored MAL username in Margarine.
            var userData = this.client.dataManager("select", user.id, "users");
            if (!userData) { 
                if (user.id !== msg.author.id) { return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noUser"])); }
                return msg.channel.send(this.client.speech(msg, ["func-dataCheck", "noAccount"])); 
            }

            username = JSON.parse(userData.profiles).MAL;
            if (!username) { return msg.channel.send(this.client.speech(msg, ["mal", "noUsername"])); }
        }        

        const url = `https://myanimelist.net/profile/${username}`;

        request(url, function(err, res, body) {
            var loadBody = cheerio.load(body);
            var text = loadBody.text().split(" "); var x = 0; var info = { aStats: {}, mStats: {} };

            do {
                var z = text[x].trim(); var y = text[x + 1] ? text[x + 1].trim() : ""; var zed = text[x + 2] ? text[x + 2].trim() : "";
                if (z + y + zed === "404NotFound") { return msg.channel.send(this.client.speech(msg, ["MAL", "404Err"])); }
                else if (z.length > 1) {
                    if (z.startsWith("Online")) {
                        if (zed.startsWith("ago")) { info.status = `${z.slice(6)} ${y} ago`; }
                        else if (z.startsWith("OnlineNow")) { info.status = z.slice(6, z.search("Gender")); }
                        else if (zed.includes(":")) { info.status = `${z.slice(6)} ${y} ${(new Date()).getFullYear()}`; }
                        else if (z.includes("Yesterday") || z.includes("Today") && zed.slice(1, 2) === "M") { 
                            info.status = `${z.slice(6, -1)} at  ${y}${zed.slice(0, 2)}`; 
                        }
                        else if (isNaN(zed) === false) { info.status = `${z.slice(6)} ${y} ${zed}`; }
                    } if (z.includes("Birthday") && !info.birthday) {
                        info.birthday = `🎂 Birthday: ${z.slice(-3)} ${y.slice(0, 2)}`;
                        if (y.search(",") > -1) { info.birthday += `, ${zed.slice(0, 4)}`; }
                    } if (z.includes("Gender")) {
                        info.gender = `🚻 Gender: ${z.substring(z.search("Gender") + 6, z.toLowerCase().search("male") + 4)}`;
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
                            } else { 
                                info.mStats.read = z.slice(7, num[0]); 
                                info.mStats.plan = zed.slice(4, -5);
                            }
                        }
                    } else if (z === "All" && !info.friends) { info.friends = `👫 Friends: ${y.slice(1, -8)}`; }
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
            if (info.gender) { list.push(info.gender); }
            if (info.birthday) { list.push(info.birthday); }
            if (info.friends) { list.push(info.friends); }

            const embed = new MessageEmbed()
                .setTitle(`${username}'s MAL Profile`)
                .setURL(url)
                .setDescription(`Last online: ${info.status}`);
                if (list.length > 0) { embed.addField("__General:__", list.join("\n")); }
                embed.addField("__Anime:__", `🕓 Days: ${info.aStats.days} | 📊 Mean: ${info.aStats.mean}\n💚 Watching: ${info.aStats.watch}\n💙 Completed: ${info.aStats.completed}\n💛 On-Hold: ${info.aStats.hold}\n💔 Dropped: ${info.aStats.drop}\n🗓 Plan-to-Watch: ${info.aStats.plan}`, true)
                .addField("__Manga:__", `🕓 Days: ${info.mStats.days} | 📊 Mean: ${info.mStats.mean}\n📗 Reading: ${info.mStats.read}\n📘 Completed: ${info.mStats.completed}\n📙 On-Hold: ${info.mStats.hold}\n📕 Dropped: ${info.mStats.drop}\n🗓 Plan-to-Read: ${info.mStats.plan}`, true)
                .setTimestamp()
                .setColor(0x2E51A2)
                .setThumbnail(loadBody(".user-image").find("img")[0].attribs["data-src"])
                .setFooter(`Requested by: ${msg.author.tag}`);

            msg.channel.send({embed});
        });    
    }
};