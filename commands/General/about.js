exports.run = async (client, message) => {
  const config = require("../../assets/settings/settings.json");
  const prefix = message.guildSettings.prefix || config.prefix;
  
  const embed = new client.methods.Embed()
     .setColor("#37FDFC")
     .setTimestamp()
     .setTitle("About Margarine")
     .setDescription(`I am a lovely and helpful bot (*Sometimes.*). Doing ${prefix}help is great for finding ways I can assist you. I was written in Komada, a Discord.js framework.\n
     \n**Name Origin:** Butterstroke#7150's typical nickname is Butter. As in the stuff that you put on toast. My name comes from the artificial butter *(Butterstroke#7150 tends to call it 'Fake Butter')* you can buy in stores called, Margarine.\n
     \n**Creation:** I was created on ${client.user.createdAt.toLocaleString()} by ${client.owner.tag}. My current version is ${config.version} as of ${config.updateDate}.\n
     \n**More Information:** I have a Github repo which contains my current update tracker and the source code if you are curious. https://github.com/Butterstroke/MargarineBot
     \n**Margarine's TOS:** For people looking for a link to my Terms and service, please refer here: https://github.com/Butterstroke/MargarineBot/blob/master/TermsAndService.md`)
     .setThumbnail(client.user.avatarURL());
  return message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};
  
exports.help = {
    name: "about",
    description: "General information.",
    usage: "",
};