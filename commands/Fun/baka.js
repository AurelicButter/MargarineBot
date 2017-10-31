exports.run = async (client, message, [User]) => {
    var user = client.funcs.userSearch(client, message, User);
    if (user.username === undefined) { return; }
    
    message.channel.send(`Baka ${user.username}! `);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"],
};
      
exports.help = {
    name: "baka",
    description: "For the stupid people.",
    usage: "[User:str]",
    usageDelim: "",
};
