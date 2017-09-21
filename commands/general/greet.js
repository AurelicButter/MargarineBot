exports.run = (client, message, [args]) => {
    message.delete().catch();

    let person = client.funcs.userSearch(client, message, args);

	if (person.id == client.user.id) {
        return message.channel.send("Why would you try and make me greet myself? I'm not that lonely!");
    }

	return message.channel.send(`Hello ${person.username}! `);
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
  name: "greet",
  description: "Have Margarine greet you or someone with a hello!",
  usage: "[person:str]",
};
