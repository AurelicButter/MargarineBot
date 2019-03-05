exports.run = async (client, msg, [...choice]) => {
    var results = choice[(Math.ceil(Math.random() * choice.length) - 1)];
    msg.channel.send(client.speech(msg, ["choose"]).replace("-user", msg.author.username).replace("-result", results));
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["choice"],
    permLevel: 0,
    botPerms: []
};
    
exports.help = {
    name: "choose",
    description: "The one stop picker for hard choices!",
    usage: "[choice:str] [...]", usageDelim: " | ",
    humanUse: "(choice)_(another one)_(etc...)"
};