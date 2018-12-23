module.exports = async (client, msg, user, tags) => {
    if (!user || user.length < 1) { user = [null]; }
    if (!tags || tags.length < 1) { tags = ["None"]; }

    if (typeof user === "object") { user = user[0]; }

    if (user === null) { user = msg.author.id; }
    else if (msg.mentions.users.size > 1 && msg.content.startsWith("<")) {
        var item = Array.from(msg.mentions.users);
        user = item[0][1].toString().slice(2, -1);
    } else if (msg.mentions.users.size > 0) { 
        if (msg.content.startsWith("<") === false) { user = msg.mentions.users.first().id; }
        else if (msg.content.indexOf("<") !== msg.content.lastIndexOf("<")) { user = Array.from(msg.mentions.users)[0][1].toString().slice(2, -1); }
    }
    else if (/^(\d{17,21})$/.test(user)) { 
        user = await Promise.resolve(client.users.fetch(user));
        user = user.id;
    }

    var members = Array.from(msg.guild.members);
    if (/^(\d{17,21})$/.test(user) === false) { 
        for (var x = 0; x < members.length; x++) {
            if (user.toLowerCase() === members[x][1].user.username.toLowerCase()) { 
                user = msg.guild.members.get(members[x][0]);
                x = members.length;
            }
            else if (members[x][1].nickname && user.toLowerCase() === members[x][1].nickname.toLowerCase()) { 
                user = msg.guild.members.get(members[x][0]);
                x = members.length;
            }
            else if (x + 1 === members.length) { user == null; }
        }
    } else { user = msg.guild.members.get(user); }

    if (user === null) { 
        msg.channel.send(client.speech(msg, ["func-userSearch", "default"]));
        return false; 
    } else if (user.user.bot === true && tags.includes("bot")) { 
        msg.channel.send(client.speech(msg, ["func-userSearch", tags[0]]));
        return false; 
    } else { return user; }
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "userSearch",
  type: "functions",
  description: "Searchs for a user with a mention, username, or a guild nickname.",
};