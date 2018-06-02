exports.run = async (client, msg, [Name, ID]) => {
    const prefix = msg.guild.settings.prefix || client.config.prefix;

    msg.delete(); 
    if (!Name) { return msg.channel.send("You need a name of an emote to search with, baka!"); }
    if (msg.content.slice(prefix.length).startsWith("react") && (!ID)) {
        return msg.channel.send("You need to specify a message's ID so that I can find it!").then(msg => { setTimeout(() => { msg.delete(); }, 4000); }); 
    }

    let emotes = Array.from(client.emojis);
    let emoji = emotes.filter((element) => {
        if (element[1].name === Name) { return element; }
    });
    var type = emoji[0][1].animated === true ? "gif" : "png";

    if (msg.content.slice(prefix.length).startsWith("react")) {
        msg.channel.messages.fetch(ID).then(msg => msg.react(client.emojis.get(emoji[0][0]))); 
    } else { msg.channel.send({files: [`https://cdn.discordapp.com/emojis/${emoji[0][0]}.${type}`]}); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["see", "emote", "react"],
    permLevel: 0,
    botPerms: ["ATTACH_FILES", "ADD_REACTIONS", "MANAGE_MESSAGES"]
};
  
exports.help = {
    name: "emoji",
    description: "Displays an enlargened emoji.",
    usage: "[Name:str] [messageID:str]",
    usageDelim: " ",
    extendedHelp: "Bring in your pool of emotes from other servers! Either use the big image or use the alias of react and add a message ID to react to a message instead!",
    humanUse: "(name)_([If reacting] messageID)"
};