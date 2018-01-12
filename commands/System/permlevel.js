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

    var permissionLevel = [
      "Level 0: Everyone",
      "Level 1: Placeholder",
      "Level 2: Guild Moderators",
      "Level 3: Guild Admins",
      "Level 4: Guild Owners",
      "Level 5: Placeholder", "Level 6: Placeholder", "Level 7: Placeholder", "Level 8: Placeholder",
      "Level 9: Toast & Butter",
      "Level 10: Bot Owner"
    ];

    if (addPerms === 4) { var addPerms = "with guild owner permissions"; }
    if (addPerms === 3) { var addPerms = "with guild admin permissions"; }
    if (addPerms === 2) { var addPerms = "with guild moderator permissions"; }
    if (addPerms === 0) { var addPerms = "with no additional permissions"; }
    if (!addPerms) { var addPerms = ""; }

    message.channel.send(`Your permission level is ${permissionLevel[permLevel]} ${addPerms}`);
};
  
exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
};
  
exports.help = {
  name: "permlevel",
  description: "Check your permission level.",
  usage: "",
  usageDelim: "",
};