const { MessageEmbed } = require("discord.js");

/**
 * Creates an embed for a moderation action.
 * @param { KlasaMessage } msg - Required.
 * @param { String } action - The action done. Either ban or kick.
 * @param { KlasaUser } user - The user affected by the action.
 * @param { String } reason - The reason behind the action.
 * @returns { {embed: MessageEmbed, DMembed: MessageEmbed} } Returns two embeds in the form of a tuple. First one is for the moderation logs and the second one is for the user involved.
 */
module.exports = function(msg, action=action.toLowerCase(), user, reason) {
    const client = msg.client;
    const Options = {
        ban: ["BAN_MEMBERS", "banned", 0xDD2E44],
        unban: ["BAN_MEMBERS", "unbanned", 0x38b058],
        kick: ["KICK_MEMBERS", "kicked", 0xFFFF66],
        mute: ["MANAGE_ROLES", "muted", 0x808080],
        unmute: ["MANAGE_ROLES", "unmuted", 0x38b058]
    };

    const embed = new MessageEmbed().setTimestamp();
    var options = Options[action];
  
    if (msg.channel.permissionsFor(msg.author).has(options[0]) === false) { 
        embed.setColor(0xDD2E44)
        .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
        .setDescription("You do not have the correct permissions for this command!");
    } else if (msg.channel.permissionsFor(client.user).has(options[0]) === false) {
        embed.setColor(0xDD2E44)
        .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
        .setDescription("I do not have the correct permissions for this command!");
    } else {
        embed.setColor(options[2])
        .setTitle(`**User ${options[1]}!**`)
        .setDescription(reason)
        .addField("**Moderator:**", `${msg.author.tag} (${msg.author.id})`)
        .addField("**User:**", `${user.user.tag} (${user.user.id})`)
        .setThumbnail(msg.author.displayAvatarURL());
    }

    const DMembed = new MessageEmbed()
        .setColor(options[2])
        .setTitle("Moderator Message")
        .setDescription(`You have been ${options[1]} from ${msg.guild.name}!\n**Reason:** ${reason}`);

    return { embed, DMembed };
};