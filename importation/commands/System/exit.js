exports.run = (client, msg) => {
  msg.delete().catch();
  msg.channel.send("Good night, Butter!")
    .then(() => { process.exit(); }) .catch((e) => { console.error(e); });
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["sleep"],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "exit",
  description: "Shuts down the bot.",
  usage: "",
  usageDelim: "",
};
