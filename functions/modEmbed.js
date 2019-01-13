module.exports = (msg, action, user, reason) => {
    const client = msg.client;
    const Options = {
        ban: ["BAN_MEMBERS", "banned", 0xDD2E44],
        unban: ["BAN_MEMBERS", "unbanned", 0x21A321],
        kick: ["KICK_MEMBERS", "kicked", 0x00AE86]
    };

    const embed = new client.methods.Embed().setTimestamp();
    var options = Options[action.toLowerCase()];
  
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
        .setTitle("**User " + options[1] + "!**")
        .setDescription(reason)
        .addField("**Moderator:**", msg.author.tag + " (" + msg.author.id + ")")
        .addField("**User:**", user.user.tag + " (" + user.user.id + ")")
        .setThumbnail(msg.author.displayAvatarURL());
    }

    const DMembed = new client.methods.Embed()
        .setColor(options[2])
        .setTitle("Moderator Message:")
        .setDescription(`You have been ${options[1]} from ${msg.guild.name}!\n**Reason:** ${reason}`);

    return { embed: embed, DMembed: DMembed };
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "modEmbed",
  type: "functions",
  description: "General embeder for moderation commands."
};