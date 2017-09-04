exports.conf = {
  enabled: true,
  spamProtection: false,
  priority: 9,
};

exports.run = (client, msg, cmd) => {
  if (cmd.conf.enabled && !msg.guildConf.disabledCommands.includes(cmd.help.name)) { return false; }
  return "This command is currently disabled";
};
