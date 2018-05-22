exports.run = async (client, message) => {
    const msg = await message.channel.send("Pinging...");
    await msg.edit(`🎉 Pong! (Took: ${msg.createdTimestamp - message.createdTimestamp}ms.) 🎉`);
};
  
exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};
  
exports.help = {
  name: "ping",
  description: "Ping/Pong command.",
  usage: ""
};