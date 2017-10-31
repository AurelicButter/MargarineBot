exports.run = async (client, message, [question, option1, option2, option3, option4, option5]) => {
  if(!question) { return message.reply("You need to provide a question."); }
  if(!option1 || !option2) { return message.reply("You need to provide at least two options!"); }

  message.delete().catch();
  const embed = new client.methods.Embed()
     .setColor("#FFFFFF")
     .setTimestamp()
     .setDescription(`A poll has been started by ${message.author.username}!`)
     .addField("Question: ", `${question}`)
     .addField("Option 1:", `✅ - ${option1}`)
     .addField("Option 2:", `❎ - ${option2}`);

  if (option3) { embed.addField("Option 3:", `☑ - ${option3}`); }
  if (option4) { embed.addField("Option 4:", `✔ - ${option4}`); }
  if (option5) { embed.addField("Option 5:", `❌- ${option5}`); }

  const msg = await message.channel.send({embed}).catch(err => client.funcs.log(err, "error"));
  await msg.react("✅");
  await msg.react("❎");
  if (option3) { await msg.react("☑"); }
  if (option4) { await msg.react("✔"); }
  if (option5) { await msg.react("❌"); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "poll",
    description: "Poll users",
    usage: "[question:str] [option1:str] [option2:str] [option3:str] [option4:str] [option5:str]",
    usageDelim: " | ",
};
