exports.run = async (client, message, [User, ...Reason]) => {
    let statement = Reason.join(" ");
    let user = client.funcs.userSearch(client, message, User);
    let guild = message.guild;
    let checked = message.channel.permissionsFor(message.author.id).has("KICK_MEMBERS");

    if (statement.length < 1) { return message.reply("You must supply a reason!"); }

    if (checked === false) { 
      const Checkembed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
        .setDescription("You do not have the correct permissions for this command!");
      return message.channel.send({embed: Checkembed});  
    }

    const embed = new client.methods.Embed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setDescription(`**Action:** Kicked\n**User:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${statement}`)
      .setThumbnail(user.avatarURL());
    
    const DMembed = new client.methods.Embed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setTitle("Moderator Message:")
      .setDescription(`You have been kicked from ${guild.name}!\n**Reason:** ${statement}`);

    await user.send({embed: DMembed});
    await guild.member(user).kick(statement);
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
    usage: "<User:str> [Reason:str]",
    usageDelim: " ",
};
