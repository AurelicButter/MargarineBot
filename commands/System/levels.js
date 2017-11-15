exports.run = async (client, message) => {
    for (let i = 0; i < 10; i++) {
        if (message.author.id === client.owner.id) { 
          if (client.permStructure[4].check(client, message)) { var addPerms = 4; }
          else if (client.permStructure[3].check(client, message)) { var addPerms = 3; }
          else if (client.permStructure[2].check(client, message)) { var addPerms = 2; }
          else { var addPerms = 0; }
          var permLevel = 10; 
        }
        else if (client.permStructure[i].check(client, message)) { var permLevel = i; }
    }

    if (permLevel === 0) { var permissionLevel = "level 0: Everyone"; }
    if (permLevel === 2) { var permissionLevel = "level 2: Guild Moderators"; }
    if (permLevel === 3) { var permissionLevel = "level 3: Guild Admins"; }
    if (permLevel === 4) { var permissionLevel = "level 4: Guild Owners"; }
    if (permLevel === 6) { var permissionLevel = "level 6: Support Team"; }
    if (permLevel === 8) { var permissionLevel = "level 8: Developer Team"; }
    if (permLevel === 9) { var permissionLevel = "level 9: Toast & Butter"; }
    if (permLevel === 10) { var permissionLevel = "level 10: Bot Owner"; }

    if (addPerms === 4) { var addPerms = "with Guild Owner permissions"; }
    if (addPerms === 3) { var addPerms = "with Guild Admin permissions"; }
    if (addPerms === 2) { var addPerms = "with Guild Moderator permissions"; }
    if (addPerms === 0) { var addPerms = "with no additional permissions"; }

    message.channel.send(`Your level is ${permissionLevel} ${addPerms}`);
};
  
exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};
  
exports.help = {
  name: "levels",
  description: "Check your permission level.",
  usage: "",
  usageDelim: "",
};