exports.run = async (client, message, user) => {
    message.delete().catch();
    client.funcs.userSearch(client, message, {user: user, name: this.help.name}, function(data) {
        if (data.valid === false) { return; }

        if (data.user.id === client.user.id) { return message.channel.send(`Why would you try and make me greet myself, ${message.author.username}? I'm not that lonely!`); }

	    message.channel.send(`Hello ${data.user.username}! `);
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: ["MANAGE_MESSAGES"],
    requiredFuncs: ["userSearch"],
};

exports.help = {
  name: "greet",
  description: "Have Margarine greet you or someone with a hello!",
  usage: "[user:str]",
};