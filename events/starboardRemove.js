const { Event } = require("klasa");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            name: "starboardRemove",
            enabled: true,
            event: "messageReactionRemove"
        });
    }

    run(reaction, user) {
        //Reaction is not in a guild, do nothing.
        if (reaction.message.guild === undefined) { return; }

        let msg = reaction.message;
        let emote = reaction.emoji;
        let sbConfig = msg.guild.settings.starboard;

        //Channel not set, do nothing.
        if (!sbConfig.channel) { return; }

        //Message is not in the cache, return as there is nothing to do.
        if (!sbConfig.msgCache.includes(msg.id)) { return; }

        //If the message is in the starboard channel, return. No starboard msgs are starred.
        if (sbConfig.sbCache.includes(msg.id)) { return; }

        if ((emote.name === "⭐" && "⭐" === sbConfig.emote) || `<:${emote.name}:${emote.id}>` === sbConfig.emote) { 
            var sbChannel = msg.guild.channels.cache.get(sbConfig.channel);

            var index = sbConfig.msgCache.indexOf(msg.id);
            var sbMsg = sbChannel.messages.cache.get(sbConfig.sbCache[index]);
            
            let embed = sbMsg.embeds[0];
            let count = Number(embed.footer.text.slice(7)) - 1; //Reduced by one at the end as reaction was removed.

            //Check for if this bot has reacted to the message. If so, increase by one.
            var sbCount = sbConfig.requiredAmount;
            if (reaction.users.cache.has(this.client.user.id)) { sbCount++; }

            if (sbCount < count) { //If count is still higher than required, edit.
                embed.setFooter(`Count: ${count}`);
                sbMsg.edit(embed);
                return;
            }
            
            sbMsg.delete().then(() => { //Else, remove and delete ids.
                msg.guild.settings.update("starboard.msgCache", msg.id, { action: "remove" }).then(() => {
                    msg.guild.settings.update("starboard.sbCache", sbMsg.id, { action: "remove" });
                });
            });
        }      
    }
};