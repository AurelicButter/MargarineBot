const moment = require("moment");

exports.run = (client, message, [amount]) => {
    let messagecount = Number(amount);
    let guild = message.guild.name;
    
    if (messagecount > 100) { return message.reply("I'm sorry, but I can't do that. That would be spam to Discord! Please request a number below 100!"); }
    let checked = message.channel.permissionsFor(message.author.id).has("MANAGE_MESSAGES");
  
    if (checked === false) { 
      const embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
        .setDescription("You do not have the correct permissions for this command!");
      return message.channel.send({embed});  
    }

    message.delete().catch();
    message.channel.fetchMessages({ limit: messagecount }).then(messages => {
          message.channel.bulkDelete(messages);
          message.reply(`Purged ${messagecount} messages from the channel.`);
          console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] ${message.author.username} has purged ${messagecount} messages from ${guild}`);
      });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [""],
    permLevel: 3,
    botPerms: ["MANAGE_MESSAGES"],
    requiredFuncs: [],
};
      
exports.help = {
    name: "purge",
    description: "Purges X amount of messages from a given channel.",
    usage: "<amount:int>",
    usageDelim: "",
};