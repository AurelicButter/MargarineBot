const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "userinfo",
            enabled: true,
            runIn: ["text"],
            aliases: ["user"],
            description: "Get a user's information",
            usage: "[user:usersearch]",
            extendedHelp: "Need Discord info on a specific user? I got you covered!"
        });
    }

    async run(msg, [user]) {
        if (user === null) { return; }
        user = msg.guild.members.cache.get(user.id);

        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(msg.guild.name, msg.guild.iconURL());

        const statusList = {
            online: "online",
            idle: "idle",
            dnd: "in do not disturb"
        };
    
        var Status = statusList[user.presence.status] || "offline";

        var activity;
        if (user.presence.activity === null) { activity = " "; }
        else if (user.presence.activity.name === "Custom Status") {
            activity = ` while doing ${user.presence.activity.state}`;
        } else {
            switch (user.presence.activity.type) { //All cases covered
                case "PLAYING":
                    activity = " while playing ";
                    break;
                case "LISTENING":
                    activity = " while listening to ";
                    break;
                case "WATCHING":
                    activity = " while watching ";
                    break;
                case "STREAMING":
                    activity = " while streaming ";
                    break;
            }
            activity += user.presence.activity.name;
        }
            
        embed.setThumbnail(user.user.displayAvatarURL())
            .setAuthor(`${user.user.tag} | ${user.id}`)
            .setDescription(`Currently ${Status}${activity}`)
            .addField("ID: ", user.id, true)
            .addField("Bot user:", user.user.bot ? "True": "False", true)
            .addBlankField(true)
            .addField("Created:", user.user.createdAt.toLocaleString(), true)
            .addField("Joined:", user.joinedAt.toLocaleString(), true)
            .setColor(0x04d5fd);

        msg.channel.send({embed});
    }
};