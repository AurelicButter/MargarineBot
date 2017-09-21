exports.run = function(client, message, args){
    let user = client.funcs.userSearch(client, message, args);
    
    return message.channel.send(`Baka ${user.username}! `);
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
