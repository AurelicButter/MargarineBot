const Komada = require("komada");
const Discord = require("discord.js");
const config = require("./assets/settings.json");
const localization = require("./assets/localization.json");
const util = require("./utilities/utilExport.js");

util.envCheck(); //Checks for the proper enviroment.

const client = new Komada.Client({
    ownerID: config.ownerID,
    prefix: config.prefix,
    clientOptions: { fetchAllMembers: false },
    cmdLogging: false,
    permStructure: new Komada.PermLevels()
      .addLevel(0, false, () => true)
      .addLevel(2, false, (client, msg) => {
        if (!msg.guild || !msg.guild.settings.modRole) { return false; }
        const modRole = msg.guild.roles.get(msg.guild.settings.modRole);
        return modRole && msg.member.roles.has(modRole.id);
      })
      .addLevel(3, false, (client, msg) => {
        if (!msg.guild || !msg.guild.settings.adminRole) { return false; }
        const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
        return adminRole && msg.member.roles.has(adminRole.id);
      })
      .addLevel(4, false, (client, msg) => msg.guild && msg.author.id === msg.guild.owner.id)
      .addLevel(9, false, (client, msg) => msg.author.id === config.secondary)
      .addLevel(10, false, (client, msg) => msg.author === client.owner)
});

util.remove(client); //Removes most default commands from the Komada directory so that there is absolutly no conflicts.

client.speech = util.speech;

client.ownerSetting = new Discord.Collection();
var keys = Object.keys(config);
for (var x = 0; keys.length > x; x++) { 
  switch (keys[x]) {
    case "owner":
      var key = Object.keys(config.owner);
      for (var y = 0; key.length > y; y++) { client.ownerSetting.set(key[y], config.owner[key[y]]); } break;
    case "database": client.database = config.database; break;
    case "build": client.ownerSetting.set("build", config.build); break;
  }
}
client.ownerSetting.set("permLevel", localization.permLevels);
client.database.items = require("./assets/values/items.json");
client.database.recipes = require("./assets/values/recipes.json");

client.login(config.token);