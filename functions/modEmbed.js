module.exports = (client, message, action, user, reason) => {
  const embedTypes = {
    ban: 0xDD2E44,
    unban: 0x21A321,
    kick: 0x00AE86,
  };

  const actionTypes = {
    ban: "Ban",
    unban: "Unban",
    kick: "Kick"
  };

  const permissionType = {
    Ban: "BAN_MEMBERS",
    Kick: "KICK_MEMBERS"
  };

  var color = embedTypes[action.toLowerCase()];
  var verb = actionTypes[action.toLowerCase()];
  var perm = permissionType[verb];

  const embed = new client.methods.Embed()
    .setTimestamp();
  
  if (message.channel.permissionsFor(message.author).has(perm) === false) { 
    embed.setColor(0xDD2E44)
      .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
      .setDescription("You do not have the correct permissions for this command!");
  } else {
    embed.setColor(color)
      .addField(`**Action:** ${verb}`, `**Moderator:** ${message.author.tag}`)
      .addField("**User:**", user.tag)
      .addField("**Reason:**", reason)
      .setThumbnail(message.author.avatarURL());
  }

  return embed;
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "modEmbed",
  type: "functions",
  description: "General embeder for moderation commands.",
};
