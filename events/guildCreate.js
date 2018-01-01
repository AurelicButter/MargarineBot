exports.run = async (client, guild) => {
    const embed = new client.methods.Embed()
        .setColor(0xF1C40F)
        .setTimestamp()
        .setTitle("Greetings!")
        .setDescription(`To the users of ${guild.name},`)
        .addField("Margarine's Message:", `Hello and thank you for inviting me to ${guild.name}! I am a somewhat helpful and lovely bot created using Komada, a Discord.js framework. To see how I will be able to assist you with, feel free to do ${client.config.prefix}help. I will send you a list of commands in which you can use.
        \nIf you have any improvement ideas, found issues or bugs, or have any complaints, feel free to use my report command and let my creator know how to improve and make me better!`)
        .addField("Margarine's TOS:", "For information on this, please refer to this file: https://github.com/Butterstroke/MargarineBot/blob/master/TermsOfService.md");

    let channel = client.funcs.defaultChannel(client, guild);
    if (guild.available) { client.settings.guilds.create(guild).catch(e => client.emit("log", e, "error")); }

    const msg = await client.channels.get(channel.id).send({embed});
    if (client.funcs.userSearch(client, msg, client.owner.id) !== undefined) {
        await client.channels.get(channel.id).send(`Oh! こんにちは <@${client.owner.id}>. I'm ready to work here!`);
    }
};