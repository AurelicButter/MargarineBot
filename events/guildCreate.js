exports.run = async (client, guild) => {
    const embed = new client.methods.Embed()
        .setTimestamp()
        .setColor(0xF1C40F)
        .addField("To the users of " + guild.name, `Hello world! My name is ${client.user.username} and thank you for inviting me to your amazing guild! I am a somewhat helpful and fantastic bot created using Komada, a Discord.js framework. To see how I will be able to assist you, feel free to do ${client.config.prefix}help.` + "I will send you my help menu in which will provide you with some pretty awesome commands, if I do say so myself!\nIf you have any improvement ideas, found issues or bugs, or have any complaints, feel free to use my report command and let my creator know how to improve me! I do have a TOS that users will need to accept for some of my abilities. Please refer to [this link](https://github.com/Butterstroke/MargarineBot/blob/master/TermsOfService.md) for more information.");

    let channel = client.funcs.defaultChannel(client, guild.id);
    if (guild.available) { client.settings.guilds.create(guild).catch(e => client.emit("log", e, "error")); }

    const msg = await channel.send({embed});
    var data = msg.channel.guild.members.find("id", client.owner.id);
    if (data !== null) { channel.send(`Oh! こんにちは <@${client.owner.id}>. I'm ready to work here! Watch me excel! :thumbsup:`); }
};