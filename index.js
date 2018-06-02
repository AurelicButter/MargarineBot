const Komada = require("komada");
const config = require("./assets/settings.json");

const permStructure = new Komada.PermLevels()
  .addLevel(0, false, () => true)
  .addLevel(2, false, (client,msg) => {
    if (!msg.guild || !msg.guild.settings.modRole) { return false; }
    const modRole = msg.guild.roles.get(msg.guild.settings.modRole);
    return modRole && msg.member.roles.has(modRole.id);
  })
  .addLevel(3, false, (client,msg) => {
    if (!msg.guild || !msg.guild.settings.adminRole) { return false; }
    const adminRole = msg.guild.roles.get(msg.guild.settings.adminRole);
    return adminRole && msg.member.roles.has(adminRole.id);
  })
  .addLevel(4, false, (client,msg) => msg.guild && msg.author.id === msg.guild.owner.id)
  .addLevel(9, false, (client,msg) => msg.author.id === config.secondary)
  .addLevel(10, false, (client,msg) => msg.author === client.owner);

const client = new Komada.Client({
    ownerID: config.ownerID,
    prefix: config.prefix,
    clientOptions: {
      fetchAllMembers: false,
    },
    cmdLogging: false,
});

client.login(config.token);