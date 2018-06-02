exports.run = async (client, msg, [user]) => {
    var data = await client.funcs.userSearch(msg, {user: [user], name: this.help.name});
    
    if (data.valid !== false) { msg.channel.send("Baka " + data.user[0].prefered + "!"); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"]
};
      
exports.help = {
    name: "baka",
    description: "For the stupid people.",
    usage: "[user:str]"
};
