exports.run = async (client, message, [User, reason]) => {
    let user = client.funcs.userSearch(client, message, User);
    if (user.username === null) { return; }
    
	if (!reason) { return message.reply("You must supply a reason for the ban."); }
    if (!message.guild.member(user).bannable) { return message.reply("I cannot ban that member"); }
    
    var Toast = client.funcs.modEmbed(client, message, "ban", user, reason);

    if (Toast[0].thumbnail) {
        await user.send({embed: Toast[2]});
        await message.guild.member(user).ban(reason);
    }

    await Toast[1].send({embed: Toast[0]});
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["b"],
    permLevel: 3,
    botPerms: ["BAN_MEMBERS", "EMBED_LINKS"],
    requiredFuncs: ["userSearch", "modEmbed"],
};
      
exports.help = {
    name: "ban",
    description: "Bans the mentioned user.",
    usage: "<User:str> [reason:str] [...]",
    usageDelim: " ",
};