exports.conf = {
  enabled: true,
  spamProtection: false,
  priority: 6,
};

exports.run = (client, msg, cmd) => {
  if (!cmd.conf.requiredFuncs) return false;
  cmd.conf.requiredFuncs.forEach((func) => {
    if (!client.funcs.hasOwnProperty(func)) return `The client is missing **${func}**, and cannot run.`;
  });
  return false;
};
