exports.run = async (client, msg, [Name, ID]) => {
    const prefix = msg.guild.settings.prefix || client.config.prefix;
    let emote = client.emojis.find("name", Name);
    
    msg.delete();   
    if (!Name || !emote) { return msg.channel.send("I can't find that emoji. My searching capabilities are case-sensitive so be sure that the emoji name is **exactly** the way it is spelled.").then(message => {
        setTimeout(() => { message.delete(); }, 4000);
    }); } else if (msg.content.slice(prefix.length).startsWith("react")) {
        if (!ID) { return msg.channel.send("You need to specify a message's ID so that I can find it!").then(msg => { setTimeout(() => { msg.delete(); }, 4000); }); }
		msg.channel.messages.fetch(ID).then(msg => msg.react(emote)); 
    } else { msg.channel.send("", { files: [emote.url]}); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["see", "emote", "react"],
    permLevel: 0,
    botPerms: ["ATTACH_FILES", "ADD_REACTIONS", "MANAGE_MESSAGES"],
};
  
exports.help = {
    name: "emoji",
    description: "Displays an enlargened emoji.",
    usage: "[Name:str] [messageID:str]",
    usageDelim: " ",
    extendedHelp: "Bring in your pool of emotes from other servers! Either use the big image or use the alias of react and add a message ID to react to a message instead!",
    humanUse: "(name)_([If reacting] messageID)"
};