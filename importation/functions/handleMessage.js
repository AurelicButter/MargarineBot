module.exports = (client, msg, edited = false) => {
  if (client.config.ignoreBots && msg.author.bot) return false; // Ignore Bots if True
  if (client.config.ignoreSelf && msg.author.id === client.user.id) return false; // Ignore Self if true
  if (client.config.selfbot && msg.author.id !== client.user.id) return false; // Ignore other users if selfbot is true
  if (!client.config.selfbot && msg.author.id === client.user.id) return false; // Ignore other users if selfbot but config option is false
  if (!client.config.editableCommands && edited) return false; // Ignore message if owner doesn't allow editableCommands
  return true;
};
