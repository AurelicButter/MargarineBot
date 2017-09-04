const config = require("../../settings.json");

exports.run = (client, msg, args) => {  
    args = msg.content.split(" ").slice(1).join(" ");
    if(args.length < 1) { return msg.reply("You need to provide a message."); }
    
    msg.delete();
    if (msg.author.id = config.ownerID) { return msg.channel.send(args) }
    return msg.channel.send(`${msg.author.username} wants to say: ${args}`);
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["echo", "talk"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
    cooldown: 0,
};
  
exports.help = {
    name: "say",
    description: "Have Margarine echo what you said.",
    usage: "",
    usageDelim: "",
    extendedHelp: "",
};