const { inspect: util } = require("util");

exports.run = (client, msg, [action, key, ...value]) => {
  if (action === "list") {
    msg.channel.send(util(msg.guildConf), { code: "js" });
  } else

  if (action === "get") {
    if (!key) return msg.reply("Please provide a key you wish to view");
    msg.reply(`The value for ${key} is currently: ${msg.guildConf[key]}`);
  } else

  if (action === "set") {
    if (!key || value[0] === undefined) return msg.reply("Please provide both a key and value!");
    const conf = client.guildConfs.get(msg.guild.id);
    if (conf[key].type === "Boolean") conf[key].toggle();
    if (conf[key].type === "String") conf[key].set(value.join(" "));
    if (conf[key].type === "Number") conf[key].set(parseInt(value.join("")));
    if (conf[key].type === "Array") conf[key].add(value);
    return msg.reply(`The new value for ${key} is: ${conf[key].data}`);
  } else

  if (action === "reset") {
    if (!key) return msg.reply("Please provide a key you wish to reset");
    client.guildConfs.get(msg.guild.id).reset(key);
    return msg.reply("The key has been reset.");
  }
  return false;
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "conf",
  description: "Define per-server configuration.",
  usage: "<set|get|reset|list> [key:str] [boolean:boolean|channel:channel|user:user|role:role|int:int|str:str]",
  usageDelim: " ",
};
