// Try await not then

const Discord = require('discord.js');
const config = require("../settings.json");

exports.run = function(client, message){
  let Author = message.author.id;
  let status = ['online', 'idle', 'dnd', 'invisible'];
  const embed = new Discord.RichEmbed()
    .setTitle("Margarine's Status Menu")
    .setColor(0x00AE86)
    .setDescription("Set Margarine's status")
    .setThumbnail(config.mAvatar)
    .setTimestamp()
    .addField("To set status:", "Type 1 for online.\nType 2 for idle.\nType 3 for Do not disturb.\nType 4 for Invisible.")
    .addField("To exit menu:", "Type exit.")

  message.channel.send({embed})
    .then(message => {
      if(message.Author.reply == '1'){
        console.log('Status changed.');
        client.user.setStatus(status[0]);
      } else if (message.Author.reply == '2'){
        console.log('Status changed.');
        client.user.setStatus(status[1]);
      } else if (message.Author.reply == '3'){
        console.log('Status changed.');
        client.user.setStatus(status[2]);
      } else if (message.Author.reply == '4'){
        console.log('Status changed.');
        client.user.setStatus(status[3]);
      } //else {
        //message.channel.send("You didn't follow instructions.");
      //}
    });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['status'],
  permLevel: 5
};

exports.help = {
  name: 'status',
  description: 'Set the status.',
  usage: 'status <args>'
};