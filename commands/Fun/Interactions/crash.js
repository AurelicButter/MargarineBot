exports.run = async (client, message) => {
    message.channel.send(`Wow. That's awful of you, ${message.author.username}. I'm just here trying to be helpful and make friends but you want to shut me down. Quite rude!`);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
      
exports.help = {
    name: "crash",
    description: ":eyes: Do it. I dare you to.",
    usage: "",
    usageDelim: "",
};
