exports.run = (client, msg, [type, name]) => {
  switch (type) {
    case "inhibitor": {
      const inhibitor = client.commandInhibitors.get(name);
      if (!inhibitor) return msg.channel.send(`- I cannot find the inhibitor: ${name}`, { code: "diff" });
      inhibitor.conf.enabled = false;
      return msg.channel.send(`+ Successfully disabled inhibitor: ${name}`, { code: "diff" });
    }
    case "monitor": {
      const monitor = client.messageMonitors.get(name);
      if (!monitor) return msg.channel.send(`- I cannot find the monitor: ${name}`, { code: "diff" });
      monitor.conf.enabled = false;
      return msg.channel.send(`+ Successfully disabled monitor: ${name}`, { code: "diff" });
    }
    case "command": {
      const command = client.commands.get(name) || client.commands.get(client.aliases.has(name));
      if (!command) return msg.channel.send(`- I cannot find the command: ${name}`, { code: "diff" });
      command.conf.enabled = false;
      return msg.channel.send(`+ Successfully disabled command: ${name}`, { code: "diff" });
    }
    default:
      return msg.channel.send("This will never happen");
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "disable",
  description: "Temporarily disables the inhibitor/monitor/command. Resets upon reboot.",
  usage: "<inhibitor|monitor|command> <name:str>",
  usageDelim: " ",
};
