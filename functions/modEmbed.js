module.exports = (client, message, action, user, author, reason) => {
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

  var color = embedTypes[action.toLowerCase()];
  var verb = actionTypes[action.toLowerCase()];

  const embed = new client.methods.Embed()
    .setColor(color)
    .setTimestamp()
    .addField(`**Action:** ${verb}`, `**Moderator:** ${author.tag}`)
    .addField("**User:**", user.tag)
    .addField("**Reason:**", reason)
    .setThumbnail(user.avatarURL());

  return embed;
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "modEmbed",
  type: "functions",
  description: "General embeder for moderation commands.",
};
