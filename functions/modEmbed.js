module.exports = (client, message, action, user, reason) => {
  const options = {
    ban: ["Ban", "BAN_MEMBERS", "banned", 0xDD2E44],
    unban: ["Unban", "BAN_MEMBERS", "unbanned", 0x21A321],
    kick: ["Kick", "KICK_MEMBERS", "kicked", 0x00AE86]
  };

  var verb = options[action.toLowerCase()][0];
  var perm = options[action.toLowerCase()][1];
  var past = options[action.toLowerCase()][2];
  var color = options[action.toLowerCase()][3];

  const embed = new client.methods.Embed()
    .setTimestamp();
  
  if (message.channel.permissionsFor(message.author).has(perm) === false) { 
    embed.setColor(0xDD2E44)
      .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
      .setDescription("You do not have the correct permissions for this command!");
  } else {
    embed.setColor(color)
      .addField(`**Action:** ${verb}`, `**Moderator:** ${message.author.tag}`)
      .addField("**User:**", user.tag)
      .addField("**Reason:**", reason)
      .setThumbnail(message.author.avatarURL());
  }

  const DMembed = new client.methods.Embed()
    .setColor(color)
    .setTimestamp()
    .setTitle("Moderator Message:")
    .setDescription(`You have been ${past} from ${guild.name}!\n**Reason:** ${reason}`);

  if (!embed.thumbnail) { var channel = message.channel; } 
  else {
    if ((!client.settings.guilds.schema.modlog) || (!client.settings.guilds.schema.defaultChannel)) { 
      client.funcs.confAdd(client);
      message.channel.send("Whoops! Looks like some settings were missing! I've fixed these issues for you. Please check the confs and set the channel.");
    } 

    if ((message.guild.settings.defaultChannel !== null) && (message.guild.settings.modlog === null)) { var channel = message.guild.channels.find("id", message.guild.settings.defaultChannel); } 
    if (message.guild.settings.modlog !== null) { var channel = message.guild.channels.find("id", message.guild.settings.modlog); } 
    
    if (!channel) { var channel = message.channel; }
  }

  return [embed, channel, DMembed];
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "modEmbed",
  type: "functions",
  description: "General embeder for moderation commands.",
};
