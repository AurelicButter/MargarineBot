exports.run = async (client, message, [kind, search]) => {
    let guild = message.guild;
    let msg = message.content.slice(2).split(" ");

    if (msg[0] === "info") {
        var kind = msg[1];
        var User = msg.slice(2).join(" ");
    } else {
        var kind = msg[0];
        var User = msg.slice(1).join(" ");
    }

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setAuthor(guild.name, guild.iconURL());

    if (kind === "user") { 
        let user = client.funcs.userSearch(client, message, User);
        if (user.username === null) {
            embed.addField(":x: No User found! :x:");
            return message.channel.send({embed});
        }

        const statusList = {
            online: "Online",
            idle: "Idle",
            dnd: "Do not Disturb"
        };

        var Status = statusList[user.presence.status];
        if (!Status) { var Status = "Offline"; } 
        
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

    else if (kind === "role") { 
        let role = guild.roles.find("name", User); 

        if (!role) { return message.channel.send("Looks like I can't find the role. My searchs are case-sensitive so please check before retyping."); }
    
        embed.addField("Role:", `${role.name} - ${role.id}`)
        .setColor(role.hexColor)
        .addField("Position:", role.position, true)
        .addField("Hex Colour:", role.hexColor, true)
        .addField("Users:", role.members.size, true);
    }

    else if (kind === "server") {
        if (!User) { 
            embed.setThumbnail(guild.iconURL())
            .setColor("#4d5fd")
            .addField("Region:", guild.region, true)
            .addField("Created:", guild.createdAt.toLocaleString(), true)
            .addField("Owner:", `${guild.owner.user.tag} - ${guild.owner.id}`)
            .addField("Members:", `${guild.memberCount - guild.members.filter(m => m.user.bot).size} (${guild.members.filter(m => m.user.bot).size} bots)`, true)
            .addField("Roles:", guild.roles.size, true);
        } 
        else { return message.reply("You can't ask information about a server with additional stuff!"); }
    }

    return message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["server", "role", "user"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"],
};

exports.help = {
  name: "info",
  description: "Get the server or user information.",
  usage: "[server|user|role] [search:str]",
  usageDelim: "",
  extendedHelp: "If using one of the aliases, you can skip [server|user|role] and define your search item!",
};