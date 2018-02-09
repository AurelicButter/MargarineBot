exports.run = async (client, message, [user]) => {
    user = client.funcs.userSearch(client, message, {user: user});
    if (user === undefined) { return; }

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
    usage: "[user:str]",
    usageDelim: "",
};
