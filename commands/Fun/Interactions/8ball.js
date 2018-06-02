exports.run = async (client, message, [args]) => {
    let response = ["Yes", "Maybe", "No", "Try again later", "Possibly", "Absolutely", "Probably not", "Outcome is looking good", "Outcome not looking good", "The stars say yes"];

    message.channel.send(`${response[~~(Math.random() * response.length)]}, ${message.author.username}.`);    
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
      
exports.help = {
    name: "8ball",
    description: "Ask the magic 8ball wizard for an answer!",
    usage: "[args:str][...]"
};