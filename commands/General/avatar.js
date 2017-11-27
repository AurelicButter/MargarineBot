exports.run = async (client, message, [User]) => {
    let user = client.funcs.userSearch(client, message, User);
    if (user.username === null) { return; }
    
    return message.channel.send("", { files: [`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`]});
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
    extendedHelp: "Fetch someone's avatar image with these niffy command."
};