const moment = require("moment");

exports.run = (client, guild) => {
    const embed = new client.methods.Embed()
        .setColor(0xF1C40F)
        .setTimestamp()
        .setTitle(`Greetings!`)
        .setDescription(`To the users of ${guild.name},`)
        .addField("Margarine's Message:", `Hello and thank you for inviting me to ${guild.name}! I am a somewhat helpful and lovely bot created using Komada, a Discord.js framework. To see how I will be able to assist you with, feel free to do m~help. I will send you a list of commands in which you can use. In addition, admins and mods of your server should check the guild configurations and set it as they please. Those commands and explanations are found in the help descriptions.
        \nIf you have any improvement ideas, found issues or bugs, or have any complaints, feel free to use my report command and let my creator know how to improve and make me better! However, if I am online, feel free to use me for fun and helpful commands!`)
        .addField("User notice!", `Currently, I have no way of storing permissions for user data based on the Discord's developer TOS. So, by using Margarine, users agree to have their info usable and manipulated for improving and usage of Margarine. Any data collected will be stored securely and safely and Margarine will not ask for any personal information such as a Discord password.`);

    if(guild.channels.exists("name", "general")) { 
        Channel = guild.channels.find("name", "general"); 
    } else {
        Channel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
    }

    if (!guild.available) { return; }

    console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] I have started working for ${guild.name}.`);
    client.configuration.insert(client, guild);
    return client.channels.get(Channel.id).send({embed});
};