exports.run = function(client, message, [kind, member]){
    let guild = message.guild;
    const type = ["server", "user"];
    let Args = kind.toLowerCase();

    if (message.mentions.users.size === 0) { var user = message.author; }
    else { var user = message.mentions.users.first(); } 

    if (user.presence.status === "online") { var Status = "Online"; }
    if (user.presence.status === "idle") { var Status = "Idle"; }
    if (user.presence.status === "dnd") { var Status = "Do not Disturb"; }
    if (user.presence.status === "offline") { var Status = "Offline"; }

    if (user.bot === "true") { var Bot = "True" }
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
    
    if (type.some(word => type.includes(Args))) {
        if (Args == type[0]){ return message.channel.send({embed: Sembed}); }
        if (Args == type[1]){ return message.channel.send({embed: Uembed}); }
    } else {
        return message.reply("You did not provide the proper type. Please use either `server` or `user`.");
    }
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
  usage: "<kind:kind> [member:member]",
  usageDelim: " ",
};
