const { Event } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            name: "starboardAdd",
            enabled: true,
            event: "messageReactionAdd"
        });
    }

    async run(reaction) {
        //Reaction is not in a guild, do nothing.
        if (reaction.message.guild === undefined) { return; }

        let msg = reaction.message;
        let emote = reaction.emoji;
        let sbConfig = msg.guild.settings.starboard;

        //Channel not set, do nothing.
        if (!sbConfig.channel) { return; }

        //Check for if this bot has reacted to the message. If so, increase by one.
        var sbCount = sbConfig.requiredAmount;
        if (reaction.users.cache.has(this.client.user.id)) { sbCount++; }
        
        //Not enough reactions to pin, do nothing.
        if (sbConfig.requiredAmount > reaction.count) { return; }

        //If message is produced by the starboard, return.
        if (sbConfig.sbCache.includes(msg.id)) { return; }

        if ((emote.name === "⭐" && "⭐" === sbConfig.emote) || `<:${emote.name}:${emote.id}>` === sbConfig.emote) { 
            var sbChannel = msg.guild.channels.cache.get(sbConfig.channel);

            //Message exists, just need to update the count.
            if (sbConfig.msgCache.includes(msg.id)) {
                var index = sbConfig.msgCache.indexOf(msg.id);
                var sbMsg = sbChannel.messages.cache.get(sbConfig.sbCache[index]);
                let embed = sbMsg.embeds[0].setFooter(`Count: ${reaction.count}`);

                sbMsg.edit(embed);
                return;
            }

            const embed = new MessageEmbed()
                .setColor(0x04d5fd)
                .setDescription(`*On ${this.client.util.timekeeper.timeMaker(msg.createdAt)}*`)
                .setThumbnail(msg.author.displayAvatarURL())
                .setFooter(`Count: ${reaction.count}`)
                .setAuthor(`${msg.author.tag} posted about...`, null, msg.url)
                .setTimestamp();
                
            if (msg.attachments.size > 0) { embed.setImage(msg.attachments.first().url); }
            if (msg.content.length > 0) { embed.addField("Message", msg.content); }
            
            sbChannel.send({embed}).then(sbMsg => {
                msg.guild.settings.update("starboard.msgCache", msg.id, { action: "add" }).then(() => {
                    msg.guild.settings.update("starboard.sbCache", sbMsg.id, { action: "add" });
                });
            });
        }      
    }
};