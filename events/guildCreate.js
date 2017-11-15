const moment = require("moment");

exports.run = async (client, guild) => {
    const config = require("../settings.json");
    const embed = new client.methods.Embed()
        .setColor(0xF1C40F)
        .setTimestamp()
        .setTitle("Greetings!")
        .setDescription(`To the users of ${guild.name},`)
        .addField("Margarine's Message:", `Hello and thank you for inviting me to ${guild.name}! I am a somewhat helpful and lovely bot created using Komada, a Discord.js framework. To see how I will be able to assist you with, feel free to do m~help. I will send you a list of commands in which you can use.
        \nIf you have any improvement ideas, found issues or bugs, or have any complaints, feel free to use my report command and let my creator know how to improve and make me better! If I am online, feel free to use me for fun and helpful commands!`)
        .addField("Margarine's TOS:", "By using Margarine, users agree to have their info usable and manipulated for improving and usage of Margarine. Any data collected will be collected anonymously and in some cases will not be stored.");

    let Channel = client.funcs.defaultChannel(client, guild);

    if (guild.available) { client.settings.guilds.create(guild).catch(e => client.emit("log", e, "error")); }

    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] I have started working for ${guild.name}.`);
    await client.user.setPresence({ activity:  { name:` m~help  | Playing around with Butter on ${client.guilds.size} servers`, type: 0 } });
    const msg = await client.channels.get(Channel.id).send({embed});
    if (client.funcs.userSearch(client, msg, config.ownerID) !== undefined) {
        await client.channels.get(Channel.id).send(`Oh! こんにちは <@${config.ownerID}>. I'm ready to work here!`);
    }
};