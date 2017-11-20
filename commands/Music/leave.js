exports.run = async (client, message) => {
    if (!message.member.voiceChannel) { return message.channel.send("You are not in my voice channel! Come in and tell me face to face!"); }
  
    message.member.voiceChannel.leave();
    return message.channel.send(`I have left ${message.member.voiceChannel}.`);
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
    name: "leave",
    description: "Leaves the VC that you are in.",
    usage: "",
    usageDelim: "",
  };
  