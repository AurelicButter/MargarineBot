const Discord = require("discord.js");
const config = require("../settings.json");

exports.run = async (client, message) => {
  let status = ["online", "idle", "dnd", "invisible"];
  const embed = new Discord.RichEmbed()
    .setTitle("Margarine's Status Menu")
    .setColor(0x00AE86)
    .setDescription("Set Margarine's status")
    .setThumbnail(config.mAvatar)
    .setTimestamp()
    .addField("To set status:", "ðŸ˜„ for online.\nðŸ˜ for idle.\nðŸ˜¡ for Do not disturb.\nðŸ‘» for Invisible.")
    .addField("To exit menu:", "âŒ")

  await message.channel.send({embed})
    .then(message => {
      message.react("ðŸ˜„"); 
      message.react("ðŸ˜");
      message.react("ðŸ˜¡"); 
      message.react("ðŸ‘»");
      message.react("âŒ");
    });

  if(client.messageReactionAdd === "ðŸ˜„"){
    console.log("Status changed.");
    return client.user.setStatus(status[0]);
  } else if (client.messageReactionAdd === "ðŸ˜"){
    console.log("Status changed.");
    return client.user.setStatus(status[1]);
  } else if (client.messageReactionAdd === "ðŸ˜¡"){
    console.log("Status changed.");
    return client.user.setStatus(status[2]);
  } else if (client.messageReactionAdd === "ðŸ‘»"){
    console.log("Status changed.");
    return client.user.setStatus(status[3]);
  } else if (client.messageReactionAdd === "âŒ"){
    console.log("User exited status menu.");
    return message.channel.send("You have exited the menu.");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["status"],
  permLevel: 5
};

exports.help = {
  name: "status",
  description: "Set the status.",
  usage: "status"
};
