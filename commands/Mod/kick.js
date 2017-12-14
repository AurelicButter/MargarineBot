exports.run = async (client, message, [User, reason]) => {
  let user = client.funcs.userSearch(client, message, User);
  if (user.username === null) { return; }

  if (!reason) { return message.reply("You must supply a reason!"); }
  if (!message.guild.member(user).kickable) { return message.reply("I cannot kick that member"); }

  var Toast = client.funcs.modEmbed(client, message, "kick", user, reason);
    
  if (Toast[0].thumbnail) {
    await user.send({embed: Toast[2]});
    await message.guild.member(user).kick(reason);
  }
    
  await Toast[1].send({embed: Toast[0]});
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["k"],
  permLevel: 2,
  botPerms: ["KICK_MEMBERS", "EMBED_LINKS"],
  requiredFuncs: ["modEmbed", "userSearch"],
};
      
exports.help = {
  name: "kick",
  description: "Kicks the mentioned user.",
  usage: "[User:str] [reason:str] [...]",
  usageDelim: " ",
};