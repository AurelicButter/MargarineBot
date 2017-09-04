const ms = require("ms");
const moment = require("moment");

exports.run = (client, message, [...args]) => {
  if (!client.lockit) client.lockit = [];
  let time = args.join(" ");
  let validUnlocks = ["release", "unlock"];
  if (!time) { return message.reply("I need a set time to lock the channel down for!"); }
  let checked = message.channel.permissionsFor(message.author.id).has("MUTE_MEMBERS");
  let guild = message.guild;
  
  //Lockdown embeds
  const Lockembed = new client.methods.Embed()
    .setColor("#FF0000")
    .setTimestamp()
    .setTitle("🔒 LOCKDOWN NOTICE 🔒")
    .setDescription(`This channel has been lockdown by ${message.author.tag} for ${time}`);

  const Unlockembed = new client.methods.Embed()
    .setColor("#FF0000")
    .setTimestamp()
    .setTitle("🔓 LOCKDOWN NOTICE 🔓")
    .setDescription("This channel is now unlocked.");

  //Permissions check
  if (checked === false) { 
    const embed = new client.methods.Embed()
        .setColor("#FF0000")
        .setTimestamp()
        .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
        .setDescription("You do not have the correct permissions for this command!");
    return message.channel.send({embed});  
  }  

  //Action
  console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Moderator/Admin deployed a lockdown at ${guild.name} for ${time}!`);
  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, { SEND_MESSAGES: null })
    .then(() => {
      message.channel.send({embed: Unlockembed});
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => { console.log(error); });
  } else {
    message.channel.overwritePermissions(message.guild.id, { SEND_MESSAGES: false })
    .then(() => {
      message.channel.send({embed: Lockembed}).then(() => {
        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send({embed: Unlockembed})).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));
      }).catch(error => { console.log(error); });
    });
  }
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: ["lockdown", "ld"],
    permLevel: 2,
    botPerms: ["MANAGE_ROLES", "EMBED_LINKS", "ADMINISTRATOR"],
    requiredFuncs: [],
};
  
exports.help = {
    name: "lock",
    description: "Locks or unlocks the channel.",
    usage: "<args:str>",
    usageDelim: " ",
};