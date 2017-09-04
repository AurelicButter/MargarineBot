exports.run = async (client, msg, [args]) => {
    if (msg.mentions.users.size === 0) {
        return msg.channel.send(msg.author.avatarURL);	
    }
    
    let user = msg.mentions.users.first();
    return msg.channel.send(user.avatarURL);
};
  
exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "avatar",
    description: "Fetch a user's avatar!",
    usage: "[mention]",
    usageDelim: "",
};