exports.conf = {
  enabled: true,
  spamProtection: false,
  priority: 7,
};

exports.run = (client, msg, cmd) => {
  let missing = [];
  if (msg.channel.type === "text") {
    missing = msg.channel.permissionsFor(client.user).missing(cmd.conf.botPerms);
  } else {
    const impliedPermissions = client.funcs.impliedPermissions();
    cmd.conf.botPerms.forEach((perm) => {
      if (!impliedPermissions[perm]) { missing.push(perm); }
    });
  }
  if (missing.length > 0) { 
    const embed = new client.methods.Embed()
    .setColor("#FF0000")
    .setTimestamp()
    .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
    .setDescription("I do not have the correct permission level for this command!")
    .addField("Missing permissions:", `**${client.funcs.toTitleCase(missing.join(", ").split("_").join(" "))}**`)
    return msg.channel.send({embed});
  }
  return false;
};
