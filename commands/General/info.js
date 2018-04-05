exports.run = async (client, message, [kind, search]) => {
    let guild = message.channel.guild;
    let msg = message.content.slice(2).split(" ");

    var x = (msg[0] === "info") ? 1 : 0;
    var kind = msg[x];
    var user = msg.slice(x + 1).join(" ");

    const embed = new client.methods.Embed()
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL());

    if (kind === "user") { 
        var data = await client.funcs.userSearch(message, {user: [user], name: this.help.name});
        if (data.valid === false) { return; }
        
        user = client.users.find("username", data.user[0].username);

        const statusList = {
            online: "Online",
            idle: "Idle",
            dnd: "Do not Disturb"
        };
    
        var Status = statusList[user.presence.status] || "Offline";
        var botUser = user.bot ? "True": "False";
        var activity = user.presence.activity !== null ? " - " + user.presence.activity.name: " ";
            
        embed.setThumbnail(user.displayAvatarURL())
        .setColor(0x04d5fd)
        .setAuthor("User: " + user.tag)
        .setDescription("ID: " + user.id)
        .addField("Created:", user.createdAt.toLocaleString(), true)
        .addField("Joined:", guild.members.get(user.id).joinedAt.toLocaleString(), true)
        .addField("Bot user:", botUser, true)
        .addField("Status:", Status + activity, true);
    }

    else if (kind === "role") { 
        let role = guild.roles.find("name", user); 

        if (!role) { return message.channel.send("Looks like I can't find the role. My searchs are case-sensitive so please check before retyping."); }
    
        embed.addField("Role:", `${role.name} - ${role.id}`)
        .setColor(role.hexColor)
        .addField("Position:", role.position, true)
        .addField("Hex Colour:", role.hexColor, true)
        .addField("Users:", role.members.size, true);
    }

    else if (kind === "server") {
        if (!user) { 
            embed.setThumbnail(guild.iconURL())
            .setColor(0x04d5fd)
            .addField("Region:", guild.region, true)
            .addField("Created:", guild.createdAt.toLocaleString(), true)
            .addField("Owner:", `${guild.owner.user.tag} - ${guild.owner.id}`)
            .addField("Members:", `${guild.memberCount - guild.members.filter(m => m.user.bot).size} (${guild.members.filter(m => m.user.bot).size} bots)`, true)
            .addField("Roles:", guild.roles.size, true);
        } 
        else { return message.reply("You can't ask information about a server with additional stuff!"); }
    }

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
  description: "Get the server or user information.",
  usage: "[server|user|role] [search:str]",
  usageDelim: " ",
  extendedHelp: "Need Discord info? I got you covered with this command!",
  humanUse: "([If not specified] server|user|role)_(search content)"
};