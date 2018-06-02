module.exports = (client, message, action, user, reason) => {
  const options = {
    ban: ["Ban", "BAN_MEMBERS", "banned", 0xDD2E44],
    unban: ["Unban", "BAN_MEMBERS", "unbanned", 0x21A321],
    kick: ["Kick", "KICK_MEMBERS", "kicked", 0x00AE86]
  };

  const embed = new client.methods.Embed().setTimestamp();
  options = options[action.toLowerCase()];
  
  if (message.channel.permissionsFor(message.author).has(options[1]) === false) { 
    embed.setColor(0xDD2E44)
      .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
      .setDescription("You do not have the correct permissions for this command!");
  } else if (message.channel.permissionsFor(client.user).has(option[1]) === false) {
    embed.setColor(0xDD2E44)
    .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
    .setDescription("I do not have the correct permissions for this command!");
  } else {
    embed.setColor(options[3])
      .addField(`**Action:** ${options[0]}`, `**Moderator:** ${message.author.tag}`)
      .addField("**User:**", user.tag)
      .addField("**Reason:**", reason)
      .setThumbnail(message.author.displayAvatarURL());
  }

  const DMembed = new client.methods.Embed()
    .setColor(options[3])
    .setTitle("Moderator Message:")
    .setDescription(`You have been ${options[2]} from ${message.guild.name}!\n**Reason:** ${reason}`);

  var channel = !embed.thumbnail ? message.channel : client.funcs.defaultChannel(client, message.guild.id, ["mod", message.channel]);

  return { embed: embed, channel: channel, DMembed: DMembed };
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "modEmbed",
  type: "functions",
  description: "General embeder for moderation commands.",
};