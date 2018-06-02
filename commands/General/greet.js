exports.run = async (client, msg, user) => {
    var data = await client.funcs.userSearch(msg, {user: [user], name: this.help.name});
    
    if (data.valid === false) { return; }

    if (data.user[0].id === client.user.id) { return msg.channel.send(`Why would you try and make me greet myself, ${msg.author.username}? I'm not that lonely!`); }

	msg.channel.send(`Hello ${data.user[0].prefered}! `);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"]
};

exports.help = {
  name: "greet",
  description: "Have Margarine greet you or someone with a hello!",
  usage: "[user:str]"
};