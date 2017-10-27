exports.run = async (client, message, [User, reason]) => {
    let user = client.funcs.userSearch(client, message, User);
    if (user.username === null) { return; }

    let guild = message.guild;
    let checked = message.channel.permissionsFor(message.author.id).has("KICK_MEMBERS");

    if (checked === false) { 
      const Checkembed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
        .setDescription("You do not have the correct permissions for this command!");
      return message.channel.send({embed: Checkembed});  
    }

    if (!reason) { return message.reply("You must supply a reason!"); }
    if (!guild.member(user).kickable) { return message.reply("I cannot kick that member"); }

    const embed = client.funcs.modEmbed(client, message, "kick", user, message.author, reason);
    
    const DMembed = new client.methods.Embed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setTitle("Moderator Message:")
      .setDescription(`You have been kicked from ${guild.name}!\n**Reason:** ${reason}`);

    await user.send({embed: DMembed});
    await guild.member(user).kick(reason);
    return await message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["k"],
    permLevel: 3,
    botPerms: ["KICK_MEMBERS"],
    requiredFuncs: [],
};
      
exports.help = {
    name: "kick",
    description: "Kicks the mentioned user.",
    usage: "[User:str] [reason:str] [...]",
    usageDelim: " ",
};
