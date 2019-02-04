exports.run = async (client, msg, [Name, ID]) => {
    const prefix = msg.guild.settings.prefix || client.config.prefix;

    if (msg.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) { msg.delete(); }
    if (!Name) { return errMsg(msg, "noName"); }
    if (msg.content.slice(prefix.length).startsWith("react") && (!ID)) { return errMsg(msg, "noID"); }
    if (Name.startsWith("<")) { Name = Name.slice(2, -20); }

    let emotes = Array.from(client.emojis);
    let emoji = emotes.filter((element) => {
        if (element[1].name === Name) { return element; }
    });

    try { var type = emoji[0][1].animated === true ? "gif" : "png"; } 
    catch(err) { return errMsg(msg, "badName"); }

    if (msg.content.slice(prefix.length).startsWith("react")) {
        msg.channel.messages.fetch(ID).then(msg => msg.react(client.emojis.get(emoji[0][0]))); 
    } else { msg.channel.send({files: [`https://cdn.discordapp.com/emojis/${emoji[0][0]}.${type}`]}); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["see", "emote", "react"],
    permLevel: 0,
    botPerms: ["ATTACH_FILES", "ADD_REACTIONS"]
};
  
exports.help = {
    name: "emoji",
    description: "Displays an enlargened emoji.",
    usage: "[Name:str] [messageID:str]", usageDelim: " ",
    extendedHelp: "Bring in your pool of emotes from other servers! Either use the big image or use the alias of react and add a message ID to react to a message instead!",
    humanUse: "(name)_([If reacting] messageID)"
};

function errMsg(msg, type) {
    msg.channel.send(msg.client.speech(msg, ["emoji", type])).then(msg => { 
        if (msg.channel.permissionsFor(msg.client.user).has("MANAGE_MESSAGES")) { 
            setTimeout(() => { msg.delete(); }, 4000);
        } 
    }); 
}