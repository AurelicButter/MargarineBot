exports.conf = {
  enabled: true,
  spamProtection: false,
  priority: 8,
};

exports.run = (client, msg, cmd) => {
  if (!cmd.conf.runIn) cmd.conf.runIn = ["text"];
  if (cmd.conf.runIn.includes(msg.channel.type)) { return false; }
  return `This command is only avaliable in ${cmd.conf.runIn.join(" ")} channels`;
};
