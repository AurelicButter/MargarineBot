exports.run = function(client, message, [...args]) {
    let guild = message.guild;

    if (message.mentions.users.size === 0) {
        if (args.length < 1) { user = message.author; }
        user = client.users.find("username", `${args}`);
        
        if (user == null) {
            var User = guild.members.find("nickname", `${args}`);
            if (User == null) { return message.reply("User not found. Please try again!"); }
            user = User.user;
        }
    } if (message.mentions.users.size > 0) {
        user = message.mentions.users.first();
    } if (!user || user === null) { 
        return message.reply("User not found. Please try again!"); 
    }

    return message.channel.send(user.avatarURL);
};
  
exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "avatar",
    description: "Fetch a user's avatar!",
    usage: "[user:str]",
    usageDelim: "",
    extendedHelp: "Now featuring the ablity to search by username and nickname without the ping!"
};
