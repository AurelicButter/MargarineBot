exports.run = (client, message, [User]) => {
    let user = client.funcs.userSearch(client, message, User);
    return message.channel.send(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`);
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
    name: "avatar",
    description: "Fetch a user's avatar!",
    usage: "[User:str]",
    usageDelim: "",
    extendedHelp: "Now featuring the ablity to search by username and nickname without the ping!"
};
