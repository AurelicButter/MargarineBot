exports.run = (client, msg) => {
  if (!client.config.selfbot) {
    msg.channel.send(`To add ${client.user.username} to your discord guild: \n https://discordapp.com/oauth2/authorize?&client_id=${client.config.clientID}&scope=bot&permissions=${client.funcs.botPermissions(client)}\n\`\`\`The above link is generated requesting the minimum permissions required to use every command currently. I know not all permissions are right for every server, so don't be afraid to uncheck any of the boxes. If you try to use a command that requires more permissions than the bot is granted, it will let you know.\`\`\`\nPlease file an issue at <https://github.com/eslachance/komada> if you find any bugs.`);
  } else {
    msg.reply("Why would you need an invite link for a selfbot...");
  }
};

exports.help = {
  name: "invite",
  description: "Displays the join server link of the bot.",
  usage: "",
  usageDelim: "",
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};
