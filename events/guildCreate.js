const moment = require("moment");

exports.run = (client, guild) => {
    const embed = new client.methods.Embed()
        .setColor(0xF1C40F)
        .setTimestamp()
        .setTitle("Greetings!")
        .setDescription(`To the users of ${guild.name},`)
        .addField("Margarine's Message:", `Hello and thank you for inviting me to ${guild.name}! I am a somewhat helpful and lovely bot created using Komada, a Discord.js framework. To see how I will be able to assist you with, feel free to do m~help. I will send you a list of commands in which you can use.
        \nIf you have any improvement ideas, found issues or bugs, or have any complaints, feel free to use my report command and let my creator know how to improve and make me better! However, if I am online, feel free to use me for fun and helpful commands!`)
        .addField("Margarine's TOS:", "By using Margarine, users agree to have their info usable and manipulated for improving and usage of Margarine. Any data collected will be collected annoynymously and in most cases will not be stored.");

    let Channel = client.funcs.defaultChannel(client, guild);

    if (!guild.available) { return; }

    console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] I have started working for ${guild.name}.`);
    client.user.setPresence({ activity:  { name:` m~help  | Playing around with Butter on ${client.guilds.size} servers`, type: 0 } });
    client.configuration.insert(client, guild);
    return client.channels.get(Channel.id).send({embed});
};
