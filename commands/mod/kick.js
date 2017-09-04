exports.run = async (client, msg, [member, ...reason]) => {
    let statement = reason.join(" ");
    let user = msg.mentions.users.first();
    let guild = msg.guild;
    let checked = msg.channel.permissionsFor(msg.author.id).has("KICK_MEMBERS");

    if (statement.length < 1) { return msg.reply("You must supply a reason!"); }

    if (checked === false) { 
      const Checkembed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
        .setDescription("You do not have the correct permissions for this command!");
      return msg.channel.send({embed: Checkembed});  
    }

    const embed = new client.methods.Embed()
		  .setColor(0x00AE86)
		  .setTimestamp()
      .setDescription(`**Action:** Kicked\n**User:** ${user.tag}\n**Moderator:** ${msg.author.tag}\n**Reason:** ${statement}`)
      .setThumbnail(user.avatarURL);
    
    const DMembed = new client.methods.Embed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setTitle("Moderator Message:")
      .setDescription(`You have been kicked from ${guild.name}!\n**Reason:** ${statement}`);

    await user.send({embed: DMembed});
    await member.kick();
    return await msg.channel.send({embed});
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
    usage: "<member:member> <reason:str>",
    usageDelim: " ",
};