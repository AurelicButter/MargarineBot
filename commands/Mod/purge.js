exports.run = (client, message, [Amount, User]) => {
    let messagecount = Number(Amount);
    let Channel = message.channel;
    if (User != null) { 
        var member = client.funcs.userSearch(client, message, User); 
    } else { 
        var member = null; 
    }
    
    if (!Amount || 2 < messagecount > 100) { return message.reply("You didn't give me an amount between 2 and 100 to delete!"); }
    let checked = message.channel.permissionsFor(message.author.id).has("MANAGE_MESSAGES");
  
    if (checked === false) { 
      const embed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
        .setDescription("You do not have the correct permissions for this command!");
      return message.channel.send({embed});  
    }

    message.delete().catch();
    Channel.messages.fetch({ limit: messagecount }).then((messages) => {
        if (member != null) {
            const filterBy = member ? member.id : client.user.id;
            messages = messages.filter(m => m.author.id === filterBy).array().slice(0, Amount);
        }

        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));

        if (member != null) { 
            return message.reply(`Successfully purged ${messagecount} messages by ${member.tag} from the channel.`); 
        } else { 
            return message.reply(`Purge ${messagecount} messages from the channel.`); 
        }
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
    usage: "[Amount:int] [User:str]",
    usageDelim: " ",
};
