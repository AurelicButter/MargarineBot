exports.run = (client, message, [User]) => {
    User = client.funcs.userSearch(client, message, User);
    
    if (!User) { return; } //If function returns a null value.
    return message.channel.send(`Baka ${User.username}! `);
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
