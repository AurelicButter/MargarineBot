const config = require("../../settings.json");

exports.run = (client, message, [Message]) => {  
    Message = message.content.split(" ").slice(1).join(" ");
    if(Message.length < 1) { return message.reply("You need to provide a message."); }
    
    message.delete().catch();
    if (message.author.id === config.ownerID) { return message.channel.send(Message); }
    return message.channel.send(`${message.author.username} wanted to say: ${Message}`);
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
