module.exports = async (client, msg, args) => {
    var users = args.user || [null]; 
    var tags = args.tags || ["None"];
    var amount = args.user.length; var x = 0; var data = [];

    do {
        if (users[x] == null || users[x].length < 1) { var user = msg.author; }
        else if (msg.mentions.users.size > 1 && msg.content.startsWith("<")) {
            var item = Array.from(msg.mentions.users);
            var user = item[1];
        } else if (msg.mentions.users.size > 0 && msg.content.startsWith("<") === false) { var user = msg.mentions.users.first(); }
        else if (/^(\d{17,21})$/.test(users[x])) { var user = await Promise.resolve(msg.client.users.fetch(users[x])); }
        else if (msg.client.users.get("username", users[x]) !== null) { var user = msg.client.users.get("username", users[x]); }
        
        if (!user) { var user = users[x]; }
        msg.channel.guild.members.forEach(element => {
            if (typeof user === "object") {
                if (element.user.username.toLowerCase() === user.username.toLowerCase()) { 
                    data.push(this.userObjects(element));
                } 
            } else if (element.nickname) {
                if (element.nickname.toLowerCase() === user.toLowerCase()) { 
                    data.push(this.userObjects(element));
                }
            }
        });       
        x++;
    } while (x < amount);

    if (data.length !== args.user.length) { var text = client.speech(["userSearch", "default"]); } 
    else if (tags.includes("bot") && user.bot === true) { var text = client.speech(["userSearch", args.name]); }

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
    };
};