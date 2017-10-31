const config = require("../../settings.json");

exports.run = (client, message, [Message]) => { 
    if (!Message) { return message.reply("You need to provide a message."); }
    
    message.delete().catch();
    if (message.author.id === config.ownerID) { return message.channel.send(Message); }
    return message.channel.send(`${message.author.username} (${message.author.id}) wanted to say: ${Message}`);
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["echo", "talk"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "say",
    description: "Have Margarine echo what you said.",
    usage: "[Message:str]",
    usageDelim: "",
    extendedHelp: "",
};
