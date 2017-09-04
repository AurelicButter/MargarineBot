exports.run = function(client, message, args){
    if (args.length < 1) {
        return message.channel.send("You need to give me an emoji!");	
    } else if (args.length > 1) {
      return message.channel.send("I can only do one emoji at a time!");
    } else {
      //console.log(args);
      let emote = client.emojis.find("name", args[0]);
      if (!emote) { return message.channel.send("I can't find that emoji."); }
      return message.channel.send(`https://cdn.discordapp.com/emojis/${emote.id}.png`);
    }
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: ["see"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "enlargen",
    description: "Displays an enlargened emoji and url.",
    usage: "<EmojiName:args>",
    usageDelim: "",
};