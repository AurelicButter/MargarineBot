exports.run = (client, message, [User]) => {
    var user = client.funcs.userSearch(client, message, User);
    
    if (user.username != null || user.username != undefined) { return message.channel.send(`Baka ${user.username}! `); }
    else { return; }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
      
exports.help = {
    name: "baka",
    description: "For the stupid people.",
    usage: "[User:str]",
    usageDelim: " ",
};
