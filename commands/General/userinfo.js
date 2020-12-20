const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

const statusList = {
    online: "online",
    idle: "idle",
    dnd: "in do not disturb"
};

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "userinfo",
            enabled: true,
            runIn: ["text"],
            aliases: ["user"],
            description: "Get a user's information",
            usage: "<user:usersearch>",
            extendedHelp: "Need Discord info on a specific user? I got you covered!"
        });

        this.humanUse = "<user>";
    }

    async run(msg, [user]) {
        user = msg.guild.members.cache.get(user.id);
        var userActivity = null;

        // If presence intent is enabled, grab presence activity for display.
        if (user.presence.clientStatus != null) {
            var status = statusList[user.presence.status] || "offline";
            var activity = user.presence.activities[0];

            if (user.presence.activity === null) { userActivity += " "; }
            else {
                switch (activity.type) { //All cases covered
                    case "PLAYING":
                        userActivity = " while playing ";
                        break;
                    case "LISTENING":
                        userActivity = " while listening to ";
                        break;
                    case "WATCHING":
                        userActivity = " while watching ";
                        break;
                    case "STREAMING":
                        userActivity = " while streaming ";
                        break;
                }
                userActivity += activity.name;
            }
        }

        var lastMsgTime;
        if (user.lastMessageChannelID) {
            var lastMsg = user.guild.channels.cache.get(user.lastMessageChannelID)
            .messages.cache.get(user.lastMessageID);
            lastMsgTime = this.client.util.dateDisplay(new Date(lastMsg.createdTimestamp));
        }
        else {
            lastMsgTime = "No message found...";
        }

        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(msg.guild.name, msg.guild.iconURL())
            .setThumbnail(user.user.displayAvatarURL())
            .setAuthor(user.user.tag);

        if (userActivity != null) {
            embed.setDescription(`Currently ${status}${userActivity}`);
        }
        
        embed.addField("ID", user.id, true);

        if (user.nickname) {
            embed.addField("Nickname", user.nickname, true);
        }           
        
        embed.addField("User Type", user.user.bot ? "Bot": "Human", true)
            .addField("Last Guild Message", lastMsgTime)
            .addField("Created", this.client.util.dateDisplay(user.user.createdAt), true)
            .addField("Joined", this.client.util.dateDisplay(user.joinedAt), true)
            .setColor(0x04d5fd);

        msg.channel.send({embed});
    }
};