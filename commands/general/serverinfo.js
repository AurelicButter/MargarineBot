exports.run = function(client, message){
    let guild = message.guild;

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setAuthor(guild.name, guild.iconURL)
        .setColor("#4d5fd")
        .setThumbnail(guild.iconURL)
        .addField(`Region: `, guild.region, true)
        .addField(`Created: `, guild.createdAt.toLocaleString(), true)
        .addField(`Owner: `, `${guild.owner.user.tag} - ${guild.owner.id}`)
        .addField(`Members: `, `${guild.memberCount - guild.members.filter(m=>m.user.bot).size} (${guild.members.filter(m=>m.user.bot).size} bots)`, true)
        .addField(`Roles: `, guild.roles.size, true);
    return message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["server"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
    cooldown: 0,
};

exports.help = {
  name: "serverinfo",
  description: "Get the server information.",
  usage: "",
};