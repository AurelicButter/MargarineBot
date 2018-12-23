exports.run = async (client, msg, user) => {
    var data = await client.funcs.userSearch(client, msg, user);
    if (data === false) { return; }
    if (data.id === client.user.id) { return msg.channel.send(client.speech(msg, ["greet", "me"]).replace("-user", msg.author.username)); }

    var name = data.nickname || data.user.username;
	msg.channel.send(client.speech(msg, ["greet", "success"]).replace("-user", name));
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