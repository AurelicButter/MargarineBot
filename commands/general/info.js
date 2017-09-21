exports.run = function(client, message, [kind, args]){
    let guild = message.guild;

    if (kind == "server" && member != null) { return message.reply("You can't ask information about a server and a user at the same time!"); } 

    if (kind == "user") { user = client.funcs.userSearch(client, message, args); }

    if (user.presence.status === "online") { var Status = "Online"; }
    if (user.presence.status === "idle") { var Status = "Idle"; }
    if (user.presence.status === "dnd") { var Status = "Do not Disturb"; }
    if (user.presence.status === "offline") { var Status = "Offline"; }

    if (user.bot === true) { var Bot = "True" }
    else { var Bot = "False" }

    if (user.presence.game === null) { var Presence = Status; } 
    else { var Presence = `${Status} - ${user.presence.game.name}`; }

    const Sembed = new client.methods.Embed()
        .setTimestamp()
        .setAuthor(guild.name, guild.iconURL)
        .setColor("#4d5fd")
        .setThumbnail(guild.iconURL)
        .addField(`Region: `, guild.region, true)
        .addField(`Created: `, guild.createdAt.toLocaleString(), true)
        .addField(`Owner: `, `${guild.owner.user.tag} - ${guild.owner.id}`)
        .addField(`Members: `, `${guild.memberCount - guild.members.filter(m=>m.user.bot).size} (${guild.members.filter(m=>m.user.bot).size} bots)`, true)
        .addField(`Roles: `, guild.roles.size, true);

    const Uembed = new client.methods.Embed()
        .setTimestamp()
        .setAuthor(guild.name, guild.iconURL)
        .setColor("#4d5fd")
        .setThumbnail(user.avatarURL)
        .addField(`User: `, `${user.tag} - ${user.id}`)
        .addField(`Created: `, user.createdAt.toLocaleString(), true)
        .addField(`Joined: `, message.guild.members.get(user.id).joinedAt.toLocaleString(), true)
        .addField(`Bot user: `, Bot, true)
        .addField(`Status: `, Presence, true);

    const Rembed = new client.methods.Embed()
        .setTimestamp()
        .setAuthor(guild.name, guild.iconURL)
        .setColor("#4d5fd")
        .addField(`Role: `, `${user.tag} - ${user.id}`)
        .addField(`Position: `, user.createdAt.toLocaleString(), true)
        .addField(`Hex Colour: `, message.guild.members.get(user.id).joinedAt.toLocaleString(), true)
        .addField(`Users: `, Bot, true)
        .addField(`Status: `, Presence, true);

    if (kind == "server") { return message.channel.send({embed: Sembed}); }
    if (kind == "user") { return message.channel.send({embed: Uembed}); }
    // if (kind == "role") { return message.channel.send({embed: Rembed}); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
    cooldown: 0,
};

exports.help = {
  name: "info",
  description: "Get the server or user information.",
  usage: "<server|user> [member:str]",
  usageDelim: " ",
  extendedHelp: "",
};
