exports.run = async (client, message, [user]) => {
    client.funcs.userSearch(client, message, {user: user, name: this.help.name}, function(data) {
        if (data.valid === false) { return; }
        user = data.user;
    
        message.channel.send("", { files: [user.displayAvatarURL()]});
    });
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
    usageDelim: ""
};