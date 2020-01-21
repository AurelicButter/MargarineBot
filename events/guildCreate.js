const { Event } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            enabled: true,
            event: "guildCreate"
        });
    }

    async run(guild) {
        if (!guild.available) { return; }

        const embed = new MessageEmbed()
            .setTimestamp()
            .setColor(0xF1C40F)
            .setTitle(`Greetings to the users of ${guild.name}!`)
            .setDescription(`My name is ${this.client.user.username} and I'd like to thank you for inviting me. I am a helpful and fantastic bot created with Klasa, a discord.js framework.\n
            If you want so see my awesome commands, feel free to do ${guild.settings.get("prefix")}help. I will send you my help menu where you will be provided with more information.\n
            If you found something not quite right or have a suggestion, please use my report command and let my creator know! I do have a TOS for some of my abilities so please refer to [this link](https://github.com/Butterstroke/MargarineBot/blob/master/TermsOfService.md) for more information. I look forward to having fun with you!`);
                
        var channel = this.client.util.defaultChannel(guild);
        await channel.send({ embed });

        guild.members.fetch(this.client.owner.id).then(data => {
            if (data !== null) { channel.send(`Oh! こんにちは <@${this.client.owner.id}>. I'm ready to work here! Watch me excel! :thumbsup:`); }
        });
    }
};