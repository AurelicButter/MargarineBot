exports.run = async (client, message) => {
    let y = Math.random();

    if (y > 0.5) { return message.channel.send("Heads!"); }
    else { return message.channel.send("Tails!"); }
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
