exports.run = function(client, message, [kind, args]){
    let guild = message.guild;

    if (kind == "server" && args != null) { return message.reply("You can't ask information about a server and a user at the same time!"); } 

    if (kind == "user") { 
        user = client.funcs.userSearch(client, message, args); 

        if (user.presence.status === "online") { var Status = "Online"; }
        if (user.presence.status === "idle") { var Status = "Idle"; }
        if (user.presence.status === "dnd") { var Status = "Do not Disturb"; }
        if (user.presence.status === "offline") { var Status = "Offline"; } 
        
        embed = new client.methods.Embed()
            .setTimestamp()
            .setAuthor(guild.name, guild.iconURL)
            .setColor("#4d5fd")
            .setThumbnail(user.avatarURL)
            .addField(`User: `, `${user.tag} - ${user.id}`)
            .addField(`Created: `, user.createdAt.toLocaleString(), true)
            .addField(`Joined: `, message.guild.members.get(user.id).joinedAt.toLocaleString(), true);

        if (user.bot === true) { embed.addField("Bot user:", "True", true); } 
        else { embed.addField("Bot user:", "False", true); }

        if (user.presence.game === null) { embed.addField(`Status: `, Status, true); } 
        else { embed.addField(`Status: `, `${Status} - ${user.presence.game.name}`, true); }
    }

    if (kind == "role") { 
        role = guild.roles.find("name", args); 
    
        embed = new client.methods.Embed()
            .setTimestamp()
            .setAuthor(guild.name, guild.iconURL)
            .setColor("#4d5fd")
            .addField("Role:", `${role.name} - ${role.id}`)
            .addField("Position:", role.position, true)
            .addField("Hex Colour:", role.hexColor, true)
            .addField("Users:", role.members.size, true);
    }

    if (kind == "server") {
        embed = new client.methods.Embed()
        .setTimestamp()
        .setAuthor(guild.name, guild.iconURL)
        .setColor("#4d5fd")
        .setThumbnail(guild.iconURL)
        .addField(`Region: `, guild.region, true)
        .addField(`Created: `, guild.createdAt.toLocaleString(), true)
        .addField(`Owner: `, `${guild.owner.user.tag} - ${guild.owner.id}`)
        .addField(`Members: `, `${guild.memberCount - guild.members.filter(m=>m.user.bot).size} (${guild.members.filter(m=>m.user.bot).size} bots)`, true)
        .addField(`Roles: `, guild.roles.size, true);
    }
    
    return message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
  name: "info",
  description: "Get the server or user information.",
  usage: "<server|user|role> [member:str]",
  usageDelim: " ",
  extendedHelp: "",
};
