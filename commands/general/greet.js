exports.run = function(client, message, [user]){
    message.delete().catch();

    if (message.mentions.users.size === 0) {
        if (args.length < 1) { user = message.author; }
        user = client.users.find("username", `${args}`);
        
        if (user == null) {
            var User = guild.members.find("nickname", `${args}`);
            if (User == null) { return message.reply("User not found. Please try again!"); }
            user = User.user;
        }
    } if (message.mentions.users.size > 0) {
        user = message.mentions.users.first();
    } if (!user || user === null) { 
        return message.reply("User not found. Please try again!"); 
    }
	
	if (message.mentions.users.has(client.user.id)) {
        return message.channel.send("Why would you try and make me greet myself? I'm not that lonely!");
    }

	return message.channel.send(`Hello ${user.username}! `);
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
  usage: "[user:str]",
};
