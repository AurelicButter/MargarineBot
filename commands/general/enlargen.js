exports.run = function(client, message, [name]){
    if (name.length < 1) { return message.channel.send("You need to give me an emoji!"); }
    else {
      let emote = client.emojis.find("name", name);
      if (!emote) { return message.channel.send("I can't find that emoji. My searching capabilities are case-sensitive so be sure that the emoji name is **exactly** the way it is spelled."); }
      return message.channel.send(`https://cdn.discordapp.com/emojis/${emote.id}.png`);
    }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["see"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "enlargen",
    description: "Displays an enlargened emoji and url.",
    usage: "<name:str>",
    usageDelim: "",
};
