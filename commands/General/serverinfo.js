const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "serverinfo",
            enabled: true,
            runIn: ["text"],
            aliases: ["server", "guildinfo", "guild"],
            description: "Get your server's information",
            extendedHelp: "Need Discord info on your server? I got you covered!"
        });
    }

    async run(msg) {
        let guild = msg.guild;

        const embed = new MessageEmbed()
            .setTimestamp()
            .setColor(0x04d5fd)
            .setAuthor(`${guild.name} | ${guild.id}`)
            .setThumbnail(guild.iconURL())            
            .addField("Region:", guild.region, true)
            .addField("Created:", this.client.util.dateDisplay(guild.createdAt), true) 
            .addField("Owner:", `${guild.owner.user.tag} - ${guild.owner.id}`)
            .addField("Members:", `${guild.memberCount - guild.members.cache.filter(m => m.user.bot).size} (${guild.members.cache.filter(m => m.user.bot).size} bots)`, true)
            .addField("Roles:", guild.roles.cache.size, true)
            .setFooter(msg.guild.name, msg.guild.iconURL());

        msg.channel.send({embed});   
    }
};