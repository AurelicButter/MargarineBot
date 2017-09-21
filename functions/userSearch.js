module.exports = (client, message, args) => {
    let guild = message.guild;

    if (args == null) { user = message.author; }

    if (args != null && message.mentions.users.size === 0) {
        user = client.users.find("username", `${args}`);
        
        if (user == null) {
            var User = guild.members.find("nickname", `${args}`);
            if (User == null) { return message.reply("User not found. Please try again!"); }
            user = User.user;
        }
    } 
    
    if (message.mentions.users.size > 0) { user = message.mentions.users.first(); } 
    if (user == null) { return message.reply("User not found. Please try again!"); }

    return user;
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "userSearch",
  type: "functions",
  description: "Searchs for a user with a mention, username, or a guild nickname. Search is case-sensitive.",
};
