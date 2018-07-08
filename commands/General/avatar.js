exports.run = async (client, msg, [user]) => {
    client.funcs.userSearch(client, msg, {user: [user], name: this.help.name}).then(data => {
        if (data.valid !== false) {
            client.users.fetch(data.user[0].id).then(avatar => { msg.channel.send("", { files: [avatar.displayAvatarURL()]}); }); 
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