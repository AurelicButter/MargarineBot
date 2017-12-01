exports.run = async (client, message, [User]) => {
    message.delete().catch();
    User = client.funcs.userSearch(client, message, User);

    if (User.username == null) { return; }
	if (User.id === client.user.id) { return message.channel.send(`Why would you try and make me greet myself, ${message.author.username}? I'm not that lonely!`); }

	message.channel.send(`Hello ${User.username}! `);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: ["MANAGE_MESSAGES"],
    requiredFuncs: [],
};

exports.help = {
  name: "greet",
  description: "Have Margarine greet you or someone with a hello!",
  usage: "[User:str]",
};