exports.run = async (client, msg, [user]) => {
    client.funcs.userSearch(client, msg, user).then(data => {
        if (data !== false) {
            msg.channel.send("", { files: [data.user.displayAvatarURL()]}); 
        }
    });
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: ["ATTACH_FILES"],
    requiredFuncs: ["userSearch"]
};
  
exports.help = {
    name: "avatar",
    description: "Fetch a user's avatar!",
    usage: "[user:str]"
};