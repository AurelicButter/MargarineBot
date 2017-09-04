exports.run = function(client, message, args){
    if (message.mentions.users.size === 0) {
        return message.channel.send(`Baka ${message.author.username}`);	
    }
    
    let user = message.mentions.users.first();
    message.channel.send(`Baka ${user.username}! `);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [""],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
      
exports.help = {
    name: "baka",
    description: "For the stupid people.",
    usage: "[user:args]",
    usageDelim: " ",
};