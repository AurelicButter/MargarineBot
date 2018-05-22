const local = require("../../assets/localization.json")["permLevels"];

exports.run = async (client, msg) => {
    for (let i = 0; i < 10; i++) {
        if (msg.author.id === client.owner.id) { 
          if (client.permStructure[4].check(client, msg)) { var addPerms = 4; }
          else if (client.permStructure[3].check(client, msg)) { var addPerms = 3; }
          else if (client.permStructure[2].check(client, msg)) { var addPerms = 2; }
          else { var addPerms = 0; }
          var permLevel = 10; 
        }
        else if (client.permStructure[i].check(client, msg)) { var permLevel = i; }
    }

    var info = addPerms ? local["general"][permLevel] + " " + local["addPerms"][addPerms] : local["general"][permLevel];

    msg.channel.send(`Your permission level is ${info}`);
};
  
exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: []
};
  
exports.help = {
  name: "permlevel",
  description: "Check your permission level.",
  usage: ""
};