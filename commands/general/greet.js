exports.run = function(client, message, [person]){
    message.delete().catch();

    if (message.mentions.users.size === 0) {
        if (person.length < 1) { person = message.author; }
        person = client.users.find("username", `${person}`);
        
        if (person == null) {
            var Person = guild.members.find("nickname", `${person}`);
            if (Person == null) { return message.reply("User not found. Please try again!"); }
            person = person.user;
        }
    } if (message.mentions.users.size > 0) {
        person = message.mentions.users.first();
    } if (!person || person === null) { 
        return message.reply("User not found. Please try again!"); 
    }

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
