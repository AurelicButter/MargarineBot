exports.run = async (client, msg, [user, reason]) => {
    user = await client.funcs.userSearch(msg, {user: [user], name: this.help.name});
    if (user.valid === null) { return; }
    user = client.users.find("username", user.user[0].username);

    if (!reason) { return msg.reply("You must supply a reason!"); }
    if (msg.guild.member(user).bannable === false) { return msg.reply("I cannot ban that member"); }

    var Toast = await client.funcs.modEmbed(client, msg, "kick", user.user[0], reason);
    
    if (Toast.embed.thumbnail) {
        await user.send({embed: Toast.DMembed});
        await msg.client.users.fetch(user.id).kick(reason);
    }
    
    await Toast.channel.send({embed: Toast[0]});
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["b"],
    permLevel: 3,
    botPerms: ["BAN_MEMBERS", "EMBED_LINKS"],
    requiredFuncs: ["userSearch", "modEmbed"]
};
      
exports.help = {
    name: "ban",
    description: "Bans the mentioned user.",
    usage: "<user:str> [reason:str] [...]",
    usageDelim: " "
};