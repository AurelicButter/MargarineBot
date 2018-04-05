const speech = require("../assets/speech.json")["userSearch"];

module.exports = async (msg, args) => {
    var users = args.user || [null]; 
    var tags = args.tags || ["None"];
    var amount = args.user.length; var x = 0; var data = [];

    do {
        var user = users[x]; var valid = false;

        if (user == null) { user = msg.author; }
        else if (msg.mentions.users.size > 0) { user = msg.mentions.users.first(); }
        else if (/^(\d{17,21})$/.test(user)) { user = await Promise.resolve(msg.client.users.fetch(user)); }
        else if (msg.client.users.find("username", user) !== null) { user = msg.client.users.find("username", user); }

        msg.channel.guild.members.forEach(element => {
            if (valid === false) {
                if (typeof user === "object") {
                    if (element.user.username.toLowerCase() === user.username.toLowerCase()) { 
                        data.push(this.userObjects(element)); 
                        valid === true;
                    } 
                } else {
                    if (element.nickname) { 
                        if (element.nickname.toLowerCase() === user.toLowerCase()) { 
                            data.push(this.userObjects(element)); 
                            valid === true;
                        }
                    }
                }
            }
        });        
        x++;
    } while (x < amount);

    if (data.length !== args.user.length) { var text = speech["default"][Math.floor(Math.random() * speech["default"].length)]; } 
    else if (tags.includes("bot") && user.bot === true) { var text = speech[args.name][Math.floor(Math.random() * speech[args.name].length)]; }

    var valid = (text) ? false : true;
    if (valid === false) { msg.channel.send(text); data = text; }
    return { valid: valid, user: data };
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "userSearch",
  type: "functions",
  description: "Searchs for a user with a mention, username, or a guild nickname. Search is case-sensitive.",
};

exports.userObjects = (element) => {
    let name = element.nickname ? element.nickname : element.user.username;

    return {
        id: element.user.id,
        username: element.user.username,
        bot: element.user.bot,
        discriminator: element.user.discriminator,
        tag: element.user.username + "#" + element.user.discriminator,
        ping: "<@" + element.user.id + ">",
        speaking: element.speaking,
        nickname: element.nickname,
        prefered: name,
        info: {
            avatar: element.user.avatar,
            joined: element.joinedTimestamp,
            roles: element._roles 
        }
    }
};