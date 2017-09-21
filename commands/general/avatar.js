exports.run = (client, message, [args]) => {
    let user = client.funcs.userSearch(client, message, args);

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
    usage: "[user:str]",
    usageDelim: "",
    extendedHelp: "Now featuring the ablity to search by username and nickname without the ping!"
};
