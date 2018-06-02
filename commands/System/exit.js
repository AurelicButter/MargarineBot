exports.run = async (client, message) => {
    await message.delete().catch();
    await message.channel.send(`Good night, ${client.owner.username}!`);
    await process.exit().catch((e) => { console.error(e); });
};
  
exports.conf = {
  enabled: true,
  runIn: ["text", "dm"],
  aliases: ["sleep"],
  permLevel: 10,
  botPerms: [], 
};
  
exports.help = {
  name: "exit",
  description: "Shuts down the bot.",
  usage: "",
};  