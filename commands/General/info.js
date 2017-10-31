exports.run = async (client, message, [kind, User]) => {
    let guild = message.guild;
    let Status = null;
    
    if (kind === "server" && User != null) { return message.reply("You can't ask information about a server and a user at the same time!"); } 

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setAuthor(guild.name, guild.iconURL());

    if (kind === "user") { 
        let user = client.funcs.userSearch(client, message, User); 

        if (user.presence.status === "online") { Status = "Online"; }
        else if (user.presence.status === "idle") { Status = "Idle"; }
        else if (user.presence.status === "dnd") { Status = "Do not Disturb"; }
        else { Status = "Offline"; } 
        
        embed.setThumbnail(user.avatarURL())
        .setColor("#4d5fd")
        .addField("User:", `${user.tag} - ${user.id}`)
        .addField("Created:", user.createdAt.toLocaleString(), true)
        .addField("Joined:", guild.members.get(user.id).joinedAt.toLocaleString(), true);

        if (user.bot === true) { embed.addField("Bot user:", "True", true); } 
        else { embed.addField("Bot user:", "False", true); }

        if (user.presence.activity === null) { embed.addField("Status:", Status, true); } 
        else { embed.addField("Status:", `${Status} - ${user.presence.activity.name}`, true); }
    }

    if (kind === "role") { 
        var role = guild.roles.find("name", User); 
    
        embed.addField("Role:", `${role.name} - ${role.id}`)
        .setColor(role.hexColor)
        .addField("Position:", role.position, true)
        .addField("Hex Colour:", role.hexColor, true)
        .addField("Users:", role.members.size, true);
    }

    if (kind === "server") {
        embed.setThumbnail(guild.iconURL())
        .setColor("#4d5fd")
        .addField("Region:", guild.region, true)
        .addField("Created:", guild.createdAt.toLocaleString(), true)
        .addField("Owner:", `${guild.owner.user.tag} - ${guild.owner.id}`)
        .addField("Members:", `${guild.memberCount - guild.members.filter(m => m.user.bot).size} (${guild.members.filter(m => m.user.bot).size} bots)`, true)
        .addField("Roles:", guild.roles.size, true);
    }

    return message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["server", "user", "role"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
  name: "info",
  description: "Get the server or user information.",
  usage: "<server|user|role> [User:str]",
  usageDelim: " ",
  extendedHelp: "",
};
