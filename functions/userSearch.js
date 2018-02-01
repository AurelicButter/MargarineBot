module.exports = (client, message, user) => {
    let guild = message.guild;

    if (user == null) { user = message.author; }
    else if (user != null && message.mentions.users.size === 0) {
        user = client.users.fetch(user);

        if (user == null) {
            user = client.users.find("username", `${user}`);
            
            if (user == null && guild !== undefined) {
                user = guild.members.find("nickname", `${user}`);
                if (user) { user = user.user; }
                else { user = null; }
            }
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