const speech = require("../assets/values/speech.json")["userSearch"];

module.exports = (client, msg, args, callback) => {
    var user = args.user ? args.user : undefined;
    var tags = args.tags ? args.tags : ["None"];

    if (user == null) { user = msg.author; }
    else if (msg.mentions.users.size > 0) { user = msg.mentions.users.first(); }
    //else if (/^(\d{17,21})$/.test(user)) { user = client.users.fetch(user); } 
    //ID searches keep returning promises. Somehow, everything else doesn't.
    else {
        var result = client.users.find("username", `${user}`);
        if (result === null) { 
            if (msg.channel.guild !== undefined) {
                user = msg.channel.guild.members.find("nickname", `${user}`);
                user = user ? user.user : null;
            }
        } else { user = result; }
    }

    if (user == null) { user = speech["default"][Math.floor(Math.random() * speech["default"].length)]; } 
    else if (tags.includes("bot") && user.bot === true) { user = speech[args.name][Math.floor(Math.random() * speech[args.name].length)]; }

    var valid = (typeof user === "string") ? false : true;
    if (valid === false) { msg.channel.send(user); }
    callback({valid: valid, user: user});
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "userSearch",
  type: "functions",
  description: "Searchs for a user with a mention, username, or a guild nickname. Search is case-sensitive.",
};