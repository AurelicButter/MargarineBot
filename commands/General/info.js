exports.run = async (client, message, [kind, search]) => {
    let guild = message.guild;
    let msg = (message.content.startsWith("<")) ? message.content.slice(client.user.id.length + 4).split(" ") : message.content.slice(2).split(" ");

    var x = (msg[0] === "info") ? 1 : 0;
    var kind = msg[x]; var user = msg.slice(x + 1).join(" ");

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL());

    switch (kind) {
        case "user":
            user = await client.funcs.userSearch(client, message, user);
            if (user === false) { return; }

            const statusList = {
                online: "online",
                idle: "idle",
                dnd: "on do not disturb mode"
            };
    
            var Status = statusList[user.presence.status] || "offline";
            var activity = user.presence.activity !== null ? " while playing " + user.presence.activity.name: " ";
            
            embed.setThumbnail(user.user.displayAvatarURL())
                .setAuthor(user.user.tag + " | " + user.id)
                .setDescription("Currently " + Status + activity)
                .addField("Created:", user.user.createdAt.toLocaleString(), true)
                .addField("Joined:", user.joinedAt.toLocaleString(), true)
                .addField("Bot user:", user.bot ? "True": "False", true); break;
        case "role":
            var role;
            guild.roles.forEach(element => { if (element.name.toLowerCase() === user.toLowerCase()) { role = element; } });
            if (!role) { return message.channel.send(client.speech(message, ["info", "role"])); }
    
            embed.addField("Role:", `${role.name} - ${role.id}`)
                .addField("Position:", role.position, true)
                .addField("Hex Colour:", role.hexColor, true)
                .addField("Users:", role.members.size, true); break;
        case "server":
            if (user) { return message.reply(client.speech(message, ["info", "server"])); }

            embed.setThumbnail(guild.iconURL())
                .addField("Region:", guild.region, true)
                .addField("Created:", guild.createdAt.toLocaleString(), true)
                .addField("Owner:", `${guild.owner.user.tag} - ${guild.owner.id}`)
                .addField("Members:", `${guild.memberCount - guild.members.filter(m => m.user.bot).size} (${guild.members.filter(m => m.user.bot).size} bots)`, true)
                .addField("Roles:", guild.roles.size, true); break;
        default: return message.channel.send(client.speech(message, ["info", "noTerm"]));
    };

    embed.setColor((kind === "role") ? role.hexColor : 0x04d5fd);
    message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["server", "role", "user"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"]
};

exports.help = {
  name: "info",
  description: "Get the server, role, or user information.",
  usage: "[server|user|role] [search:str]", usageDelim: " ",
  extendedHelp: "Need Discord info? I got you covered with this command!",
  humanUse: "([If not specified] server|user|role)_(search content)"
};