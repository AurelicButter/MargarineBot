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
            usage: "<role:rolesearch>",
            extendedHelp: "Need Discord info on a specific role? I got you covered!"
        });

        this.humanUse = "<role>";
    }

    async run(msg, [role]) {
        const embed = new MessageEmbed()
            .setTimestamp()
            .setAuthor(`${role.name} | ${role.id}`)
            .setColor(role.hexColor)
            .addField("Position:", (msg.guild.roles.cache.size - role.position), true)
            .addField("Hex Colour:", role.hexColor, true)
            .addField("User Count:", role.members.size, true)
            .addField("Hoisted", role.hoist, true)
            .addField("Managed", role.managed, true)
            .addField("Mentionable", role.mentionable, true)
            .setFooter(msg.guild.name, msg.guild.iconURL());

        msg.channel.send({embed});
    }
};