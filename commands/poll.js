const Discord = require("discord.js");

exports.run = function(client, message, args){
  args = message.content.split(" ").slice(1).join(" ");
  if(args.length < 1) { return message.reply("You need to provide a question."); }

  message.delete().catch();
  const embed = new Discord.RichEmbed()
     .setColor("#FFFFFF")
     .setTimestamp()
     .setDescription(`${message.author.username} has started a poll!`)
     .addField("Question: ", `${args}`);
    return message.channel.send({embed})
      .then(message => {
        message.react("✅");
        message.react("❌");
       });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["poll"],
  permLevel: 0
};

exports.help = {
  name: "Poll",
  description: "Poll users",
  usage: "poll <Topic>"
};
