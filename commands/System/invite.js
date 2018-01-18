exports.run = async (client, message) => {
    return message.send(`My Discord guild invite link: <${client.invite}> 
    \nThe above invite link is generated requesting the minimum permissions required to run all of my current commands. If there is a command that requires another permission that is not selected, I will let you know so that you can make those changes. :smile:`);
};
  
exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};

exports.help = {
    name: "invite",
    description: "Displays the join server link of the bot.",
    usage: "",
};