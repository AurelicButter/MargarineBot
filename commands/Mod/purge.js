exports.run = async (client, message, [Amount, user]) => {
    let messagecount = Number(Amount) + 1;
    let Channel = message.channel; var member = null;

    if (user) { member = client.funcs.userSearch(client, message, user); }
    
    if (!Amount || (2 > Amount) || (Amount > 99)) { return message.reply("You didn't give me an amount between 2 and 99 to delete!"); }
  
    if (message.channel.permissionsFor(message.author.id).has("MANAGE_MESSAGES") === false) { 
      const embed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
        .setDescription("You do not have the correct permissions for this command!");
      return message.channel.send({embed});  
    }

    Channel.messages.fetch({ limit: messagecount }).then((messages) => {
        if (user) {
            message.delete();
            const filterBy = member ? member.id : client.user.id;
            messages = messages.filter(m => m.author.id === filterBy).array().slice(0, Amount);
        }

        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));

        if (user) { 
            return message.reply(`Successfully purged ${Amount} messages by ${member.tag} from the channel.`); 
        } else { 
            return message.reply(`Purged ${Amount} messages from the channel.`); 
        }
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 2,
    botPerms: ["MANAGE_MESSAGES"],
    requiredFuncs: ["userSearch"],
    cooldown: 30,
};
      
exports.help = {
    name: "purge",
    description: "Purges X amount of messages from a given channel.",
    usage: "[Amount:int] [user:str]",
    usageDelim: " ",
    extendedHelp: "Due to limitations, purge can only delete between 2 and 100 messages. If you wish to purge more, please wait out the cooldown (30 seconds) and do it again."
};