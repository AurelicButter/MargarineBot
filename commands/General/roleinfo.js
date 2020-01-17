const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "roleinfo",
            enabled: true,
            runIn: ["text"],
            aliases: ["role"],
            description: "Get information on a role",
            usage: "[rolesrc:str]",
            extendedHelp: "Need Discord info on a specific role? I got you covered!"
        });
    }

    async run(msg, [rolesrc]) {
        var role;
        msg.guild.roles.forEach(element => { if (element.name.toLowerCase() === rolesrc.toLowerCase()) { role = element; } });
        if (!role) { return this.client.speech(msg, ["roleinfo"]); }

        const embed = new MessageEmbed()
            .setTimestamp()
            .setAuthor(`${role.name} | ${role.id}`)
            .setColor(role.hexColor)
            .addField("Position:", (msg.guild.roles.size - role.position), true)
            .addField("Hex Colour:", role.hexColor, true)
            .addField("User Count:", role.members.size, true)
            .addField("Hoisted", role.hoist, true)
            .addField("Managed", role.managed, true)
            .addField("Mentionable", role.mentionable, true)
            .setFooter(msg.guild.name, msg.guild.iconURL());

        msg.channel.send({embed});
    }
};