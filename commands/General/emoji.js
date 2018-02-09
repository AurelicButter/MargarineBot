exports.run = async (client, message, [Name, ID]) => {
    const prefix = message.guild.settings.prefix || client.config.prefix;
    let emote = client.emojis.find("name", Name);
    
    message.delete();   
    if (!Name || !emote) { return message.channel.send("I can't find that emoji. My searching capabilities are case-sensitive so be sure that the emoji name is **exactly** the way it is spelled.").then(Message => {
        setTimeout(() => { Message.delete(); }, 4000);
    }); }
    
    else if (message.content.slice(prefix.length).startsWith("react")) {
        if (!ID) { return message.channel.send("You need to specify a message's ID so that I can find it!").then(Message => { setTimeout(() => { Message.delete(); }, 4000); }); }
		message.channel.messages.fetch(ID).then(msg => msg.react(emote)); 
    } else { return message.channel.send("", { files: [emote.url]}); }
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