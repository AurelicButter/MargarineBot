const { inspect } = require("util");

exports.run = (client, msg, [code]) => {
  try {
    let evaled = eval(code);
    if (typeof evaled !== "string") {
      evaled = inspect(evaled);
    }
    msg.channel.send(client.funcs.clean(client, evaled), { code: "xl" });
  } catch (err) {
    msg.channel.send(`\`ERROR\` \`\`\`xl\n${
      client.funcs.clean(client, err)
    }\n\`\`\``);
    if (err.stack) client.funcs.log(err.stack, "error");
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["ev"],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "eval",
  description: "Evaluates arbitrary Javascript. Reserved for bot owner.",
  usage: "<expression:str>",
  usageDelim: "",
};
