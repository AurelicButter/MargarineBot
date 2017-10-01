exports.run = (client, message) => {
  const config = require("../../settings.json");
  
  const embed = new client.methods.Embed()
     .setColor("#37FDFC")
     .setTimestamp()
     .setTitle("About Margarine")
     .setDescription(`I am a lovely and helpful bot (*Sometimes.*). Doing ${config.prefix}help is great for finding ways I can assist you. I was written in Komada, a Discord.js framework.\n
     \n**Name Origin:** Butterstroke#7150's typical nickname is Butter. As in the stuff that you put on toast. My name comes from the artificial butter *(Butterstroke#7150 tends to call it 'Fake Butter')* you can buy in stores called, Margarine.\n
     \n**Creation:** I was created on ${client.user.createdAt.toLocaleString()} by Butterstroke#7150. My current version is ${config.version} as of ${config.updateDate}.\n
     \n**More Info:** To find out more about what improvements ${config.version} is going to contain, please visit this link: https://github.com/Butterstroke/MargarineBot/projects/1. Any issues, complaints, improvements, or bugs should be reported using the report command!`)
     .setThumbnail(client.user.avatarURL);
  return message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "about",
    description: "General information about Margarine.",
    usage: "",
};
