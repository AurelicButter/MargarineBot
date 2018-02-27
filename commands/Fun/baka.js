exports.run = async (client, message, [user]) => {
    client.funcs.userSearch(client, message, {user: user, name: this.help.name}, function(data) {
        if (data.valid === false) { return; }

        message.channel.send(`Baka ${data.user.username}! `);
    });
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
