const speech = require("../assets/values/userSearch.json");

module.exports = (client, msg, args) => {
    var user = args ? args.user : undefined;
    var botCheck = args ? args.bot : undefined;
    let prefix = msg.guild.settings.prefix || client.config.prefix;
    let cmd = msg.content.split(" ")[0].slice(prefix.length);
    cmd = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if (user == null) { user = msg.author; }
    else if (user != null && msg.mentions.users.size === 0) {
        user = client.users.fetch(user);

        if (user == null) {
            user = client.users.find("username", `${user}`);
            
            if (user == null && msg.guild !== undefined) {
                user = msg.guild.members.find("nickname", `${user}`);
                user = user ? user.user : null;
            }
        }
    } else if (msg.mentions.users.size > 0) { user = msg.mentions.users.first(); } 

    if (user == null) { msg.reply("User not found. Please try again!"); } 
    else if (botCheck && user.bot === true) { msg.channel.send(speech[cmd.help.name][Math.floor(Math.random() * speech[cmd.help.name].length)]); }

    return user;
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "userSearch",
  type: "functions",
  description: "Searchs for a user with a mention, username, or a guild nickname. Search is case-sensitive.",
};