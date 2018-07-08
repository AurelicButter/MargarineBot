exports.run = async (client, message, [kind, search]) => {
    let guild = message.channel.guild;
    let msg = (message.content.startsWith("<")) ? message.content.slice(client.user.id.length + 4).split(" ") : message.content.slice(2).split(" ");

    var x = (msg[0] === "info") ? 1 : 0;
    var kind = msg[x]; var user = msg.slice(x + 1).join(" ");

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL());

    switch (kind) {
        case "user":
            var data = await client.funcs.userSearch(client, message, {user: [user], name: this.help.name});
            if (data.valid === false) { return; }
            user = await Promise.resolve(client.users.fetch(data.user[0].id));

            const statusList = {
                online: "Online",
                idle: "Idle",
                dnd: "Do not Disturb"
            };
    
            var Status = statusList[user.presence.status] || "Offline";
            var botUser = user.bot ? "True": "False";
            var activity = user.presence.activity !== null ? " - " + user.presence.activity.name: " ";
            
            embed.setThumbnail(user.displayAvatarURL())
                .setAuthor("User: " + user.tag)
                .setDescription("ID: " + user.id)
                .addField("Created:", user.createdAt.toLocaleString(), true)
                .addField("Joined:", guild.members.get(user.id).joinedAt.toLocaleString(), true)
                .addField("Bot user:", botUser, true)
                .addField("Status:", Status + activity, true); break;
        case "role":
            guild.roles.forEach(element => { if (element.name.toLowerCase() === user.toLowerCase()) { role = element; } });
            if (!role) { return message.channel.send("Looks like I can't find the role. Be sure it is spelled correctly."); }
    
            embed.addField("Role:", `${role.name} - ${role.id}`)
                .addField("Position:", role.position, true)
                .addField("Hex Colour:", role.hexColor, true)
                .addField("Users:", role.members.size, true); break;
        case "server":
            if (user) { return message.reply("You can't ask information about a server with additional stuff!"); }

            embed.setThumbnail(guild.iconURL())
                .addField("Region:", guild.region, true)
                .addField("Created:", guild.createdAt.toLocaleString(), true)
                .addField("Owner:", `${guild.owner.user.tag} - ${guild.owner.id}`)
                .addField("Members:", `${guild.memberCount - guild.members.filter(m => m.user.bot).size} (${guild.members.filter(m => m.user.bot).size} bots)`, true)
                .addField("Roles:", guild.roles.size, true); break;
        default: return message.channel.send("You didn't give a correct search term. Do either server, user, or role.");
    };

    var colour = (kind === "role") ? role.hexColor : 0x04d5fd;
    embed.setColor(colour);
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