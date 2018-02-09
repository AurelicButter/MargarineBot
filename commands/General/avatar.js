exports.run = async (client, message, user) => {
    user = client.funcs.userSearch(message, {user: user});
    if (user.username === null) { return; }
    
    return message.channel.send("", { files: [`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`]});
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: ["ATTACH_FILES"],
    requiredFuncs: ["userSearch"],
};
  
exports.help = {
    name: "avatar",
    description: "Fetch a user's avatar!",
    usage: "[user:str]",
    usageDelim: "",
    extendedHelp: "Fetch someone's avatar image."
};