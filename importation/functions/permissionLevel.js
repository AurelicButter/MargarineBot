module.exports = (client, user, dm) => {
  const developer = require("../../../developers.json");
  let permlvl = 0;
  if (dm) {
    if (user.id === client.config.ownerID) permlvl = 10;
    return permlvl;
  }
  const modRole = user.guild.roles.find("name", user.guild.conf.modRole);
  const adminRole = user.guild.roles.find("name", user.guild.conf.adminRole);
  if (modRole && user.roles.has(modRole.id)) permlvl = 2;
  if (adminRole && user.roles.has(adminRole.id)) permlvl = 3;
  if (user.id === user.guild.owner.id) permlvl = 4;
  if (user.id === developer.id) permlvl = 8;
  if (user.id === client.config.ownerID) permlvl = 10;
  return permlvl;
};
