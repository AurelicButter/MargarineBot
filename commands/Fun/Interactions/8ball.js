exports.run = async (client, message, [args]) => {
    let response = ["Yes", "Maybe", "No"];

    message.channel.send(`${response[~~(Math.random() * response.length)]} ${message.author.username}. Your question of \`${args}\` will act as predicted. I am ${(Math.random() * 100).toFixed(2)}% sure of this.`);    
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
    name: "8ball",
    description: "Ask the magic 8ball wizard for an answer!",
    usage: "[args:str][...]",
    usageDelim: "",
};