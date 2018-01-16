exports.run = async (client, message) => {
    let y = Math.random() > .5 ? "Heads!": "Tails!";
    message.channel.send(y);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};
      
exports.help = {
    name: "coin",
    description: "Flips a coin!",
    usage: "",
    usageDelim: "",
};
