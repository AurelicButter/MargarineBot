exports.run = (client, msg, sides) => {
    sides = (sides.length < 1) ? 6 : Number(sides); 
    if (sides === 0) { return msg.channel.send(client.speech(msg, ["roll", "zero"])); }

    if (Number.isInteger(sides)) {
        if (sides < 0) { return msg.channel.send(client.speech(msg, ["roll", "negative"])); } 
        var y = Math.floor(Math.random() * (Math.floor(sides) - Math.ceil(1) + 1)) + Math.ceil(1);
        return msg.channel.send(client.speech(msg, ["roll", "success"]).replace("-value", y));
    } 
    return msg.channel.send(client.speech(msg, ["roll", "noNumber"])); 
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
  
exports.help = {
    name: "roll", description: "Roll a die!",
    usage: "[sides:str]", humanUse: "[sides]"
};