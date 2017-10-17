module.exports = (client, message, action, user, author, reason) => {
  const embedTypes = {
    ban: 0xFF0000,
    unban: 0x21A321,
    kick: 0x00AE86,
  };

  var color = embedTypes[action.toLowerCase()];

  const embed = new client.methods.Embed()
    .setColor(color)
    .setTimestamp()
    .addField("**Action**", action)
    .addField("**User**", user.tag)
    .addField("**Moderator", author.tag)
    .addField("**Reason**", reason)
    setThumbnail(user.avatarURL());

  return embed;
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "modEmbed",
  type: "functions",
  description: "General embeder for moderation commands.",
};
