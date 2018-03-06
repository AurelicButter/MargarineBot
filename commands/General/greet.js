exports.run = async (client, message, user) => {
    var data = await client.funcs.userSearch(message, {user: [user], name: this.help.name});
    
    if (data.valid === false) { return; }

    if (data.user[0].id === client.user.id) { return message.channel.send(`Why would you try and make me greet myself, ${message.author.username}? I'm not that lonely!`); }

	message.channel.send(`Hello ${data.user[0].prefered}! `);
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
  name: "greet",
  description: "Have Margarine greet you or someone with a hello!",
  usage: "[user:str]",
};