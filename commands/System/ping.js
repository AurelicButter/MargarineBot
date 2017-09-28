exports.run = async (client, msg) => {
  try {
    const message = await msg.channel.send("Pinging...");
    await message.edit(`🎉 Pong! (Took: ${message.createdTimestamp - msg.createdTimestamp}ms.) 🎉`);
  } catch (e) { client.funcs.log(e, "error"); }
};
  
exports.conf = {
  enabled: true,
  runIn: ["text", "dm"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};
  
exports.help = {
  name: "ping",
  description: "Ping/Pong command.",
  usage: "",
  usageDelim: "",
};
