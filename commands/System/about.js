const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'about',
            runIn: ['text', 'dm'],
            aliases: ["stats", "dm"],
            guarded: true,
            description: 'General information',
            usage: ""
        });
    }

    async run(msg) {
        const embed = new MessageEmbed()
        .setColor(0x37FDFC)
        .setTitle("About Me")
        .setDescription(`[Github](https://github.com/Butterstroke/MargarineBot) | [Terms Of Service](https://github.com/Butterstroke/MargarineBot/blob/master/TermsOfService.md)
        \nI am a very helpful and amazing bot! Doing ${prefix}help is great for finding ways I can assist you. I was written with Discord.js and Klasa, a Discord.js framework.
        \n**Stats:** I have been online, helping out, for ${client.funcs.timeStamp(client, client.uptime)} using ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB of memory. ${client.users.size} users across ${client.guilds.size} guilds with ${client.channels.size.toLocaleString()} channels depend on my functions to be as reliable as possible!
        \n**Name Origin:** Butterstroke#7150's typical nickname is Butter. As in the stuff that you put on toast. My name comes from the artificial butter *(He tends to call it 'Fake Butter')* you can buy in stores called, Margarine.        
        \n**Creation:** I was created on the ${dateMaker(this.client.user.createdAt)} by Butterstroke#7150.`)
        .setThumbnail(this.client.user.displayAvatarURL())
        .setFooter("Running on Margarine " + client.ownerSetting.get("build").version + " | Released on: " + client.ownerSetting.get("build").releaseDate);

        msg.channel.send({embed});
    }
};

function dateMaker(date) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = date.toLocaleString().split(" ")[0].split("-");

    return d[2] + " " + months[d[1]] + " " + d[0];
}