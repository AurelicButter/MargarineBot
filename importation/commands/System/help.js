const buildHelp = (client, msg) => new Promise((resolve) => {
  const help = {};
  const mps = [];

  const commandNames = Array.from(client.commands.keys());
  const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
  const permissionLevel = msg.guild ? msg.member.permLevel : msg.author.permLevel;

  client.commands.filter(cmd => permissionLevel >= cmd.conf.permLevel).forEach((command) => {
    mps.push(new Promise((res) => {
      const cat = command.help.category;
      const subcat = command.help.subCategory;
      if (!help.hasOwnProperty(cat)) help[cat] = {};
      if (!help[cat].hasOwnProperty(subcat)) help[cat][subcat] = [];
      help[cat][subcat].push(`${msg.guildConf.prefix}${command.help.name}${" ".repeat(longest - command.help.name.length)} :: ${command.help.description}`);
      res();
    }));
  });
  Promise.all(mps).then(resolve(help));
});

exports.run = (client, msg, [cmd]) => {
  if (!cmd) {
    buildHelp(client, msg)
      .then((help) => {
        const helpMessage = [];
        for (const key in help) {
          helpMessage.push(`**${key} Commands**: \`\`\`asciidoc`);
          for (const key2 in help[key]) {
            helpMessage.push(`= ${key2} =`);
            helpMessage.push(`${help[key][key2].join("\n")}\n`);
          }
          helpMessage.push("```\n\u200b");
        }
        if (!client.config.selfbot) {
          msg.author.send(helpMessage, { split: { char: "\u200b" } }).catch(e => client.funcs.log(e, "error"));
          if (msg.channel.type.toLowerCase() !== "dm") {
            msg.reply("Commands have been sent to your DMs.");
          }
        } else {
          msg.channel.send(helpMessage, { split: { char: "\u200b" } })
            .catch(e => client.funcs.log(e, "error"));
        }
      });
  } else if (client.commands.has(cmd)) {
    cmd = client.commands.get(cmd);
    if (!client.config.selfbot) {
      msg.author.send(`= ${cmd.help.name} = \n${cmd.help.description}\nusage :: ${client.funcs.fullUsage(client, cmd)}\nExtended Help ::\n${cmd.help.extendedHelp ? cmd.help.extendedHelp : "No extended help available."}`, { code: "asciidoc" });
    } else {
      msg.channel.send(`= ${cmd.help.name} = \n${cmd.help.description}\nusage :: ${client.funcs.fullUsage(client, cmd)}\nExtended Help ::\n${cmd.help.extendedHelp ? cmd.help.extendedHelp : "No extended help available."}`, { code: "asciidoc" });
    }
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "help",
  description: "Display help for a command.",
  usage: "[command:str]",
  usageDelim: "",
};
