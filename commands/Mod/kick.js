exports.run = async (client, msg, [user, reason]) => {
  user = await client.funcs.userSearch(msg, {user: [user], name: this.help.name});
  if (user.valid === null) { return; }
  user = client.users.find("username", user.user[0].username);

  if (!reason) { return msg.reply("You must supply a reason!"); }
  if (msg.guild.member(user).kickable === false) { return msg.reply("I cannot kick that member"); }

  var Toast = await client.funcs.modEmbed(client, msg, "kick", user.user[0], reason);
    
  if (Toast.embed.thumbnail) {
    await user.send({embed: Toast.DMembed});
    await msg.client.users.fetch(user.id).kick(reason);
  }
    
  await Toast.channel.send({embed: Toast[0]});
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: ["k"],
  permLevel: 2,
  botPerms: ["KICK_MEMBERS", "EMBED_LINKS"],
  requiredFuncs: ["modEmbed", "userSearch"]
};
      
exports.help = {
  name: "kick",
  description: "Kicks the mentioned user.",
  usage: "[user:str] [reason:str] [...]",
  usageDelim: " "
};