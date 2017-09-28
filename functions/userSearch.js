module.exports = (client, message, User) => {
    let guild = message.guild;

    if (User == null) { var user = message.author; }

    if (User != null && message.mentions.users.size === 0) {
        var user = client.users.find("id", `${User}`);

        if (user == null) {
            var user = client.users.find("username", `${User}`);
            
            if (user == null) {
                var user = guild.members.find("nickname", `${User}`);
                user = user.user;
            }
        }
    } 
    
    if (message.mentions.users.size > 0) { var user = message.mentions.users.first(); } 
    if (user == null) { return message.reply("User not found. Please try again!"); }

    return user;
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "userSearch",
  type: "functions",
  description: "Searchs for a user with a mention, username, or a guild nickname. Search is case-sensitive.",
};
