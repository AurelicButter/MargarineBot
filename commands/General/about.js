exports.run = async (client, msg) => {
    const config = require("../../assets/settings.json");
    const prefix = msg.guildSettings.prefix || config.prefix;
  
    const embed = new client.methods.Embed()
        .setColor(0x37FDFC)
        .setTimestamp()
        .setTitle("About Margarine")
        .setDescription(`I am a very helpful (*Sometimes.*) and amazing bot! Doing ${prefix}help is great for finding ways I can assist you. I was written in Komada, a Discord.js framework.
        \n**Name Origin:** Butterstroke#7150's typical nickname is Butter. As in the stuff that you put on toast. My name comes from the artificial butter *(Butterstroke#7150 tends to call it 'Fake Butter')* you can buy in stores called, Margarine.
        \n**Creation:** I was created on ${client.user.createdAt.toLocaleString()} by ${client.owner.tag}. My current version is ${config.build.version} as of ${config.build.releaseDate}.
        \n**More Information:** I have a Github repo which contains my current update tracker and the source code with [this link](https://github.com/Butterstroke/MargarineBot). For people looking for my TOS, please refer [here](https://github.com/Butterstroke/MargarineBot/blob/master/TermsAndService.md)`)
        .setThumbnail(client.user.displayAvatarURL());
    msg.channel.send({embed});
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
  
exports.help = {
    name: "about",
    description: "General information.",
    usage: ""
};