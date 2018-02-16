exports.run = async (client, message, [...choice]) => {
    var results = Math.ceil(Math.random() * choice.length);
    results = choice[(results - 1)];

    message.channel.send(`${message.author.username}, I think **${results}** would be the best choice!`);
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};
    
exports.help = {
    name: "choose",
    description: "The one stop picker for hard choices!",
    usage: "[choice:str] [...]",
    usageDelim: " | ",
    humanUse: "(choice)_(another one)_(etc...)"
};