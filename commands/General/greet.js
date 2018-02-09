exports.run = async (client, message, user) => {
    message.delete().catch();
    user = client.funcs.userSearch(message, {user: user});
    if (user == null) { return; }
    
	if (user.id === client.user.id) { return message.channel.send(`Why would you try and make me greet myself, ${message.author.username}? I'm not that lonely!`); }

	message.channel.send(`Hello ${user.username}! `);
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