exports.conf = {
  enabled: true,
  spamProtection: false,
  priority: 10,
};

exports.run = (client, msg, cmd) => {
  const embed = new client.methods.Embed()
    .setColor("#FF0000")
    .setTimestamp()
    .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
    .setDescription("You do not have the correct permission level for this command!");
    
  if (!msg.guild) {
    if (msg.author.permLevel >= cmd.conf.permLevel) return false;
    return msg.channel.send({embed});
  }
  if (msg.member.permLevel >= cmd.conf.permLevel) return false;
  return msg.channel.send({embed});
};
