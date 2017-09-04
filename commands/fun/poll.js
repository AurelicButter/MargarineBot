exports.run = async (client, message, [...topic]) => {
  topic = message.content.split(" ").slice(1).join(" ");
  if(topic.length < 1) { return message.reply("You need to provide a question."); }

  message.delete().catch();
  const embed = new client.methods.Embed()
     .setColor("#FFFFFF")
     .setTimestamp()
     .setDescription(`${message.author.username} has started a poll!`)
     .addField("Question: ", `${topic}`);
  const msg = await message.channel.send({embed}).catch(err => client.funcs.log(err, "error"));
  await msg.react("✅");
  await msg.react("❌");
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
    name: "poll",
    description: "Poll users",
    usage: "<topic:topic>",
    usageDelim: "",
};