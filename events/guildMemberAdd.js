const moment = require("moment");

exports.run = (client, guild) => {
  var Guild = guild.guild;
  var member = guild.user;

  if (Guild.channels.exists("name", "general")) { 
      Channel = Guild.channels.find("name", "general"); 
  } else {
      Channel = Guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
  }

  console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] New User at ${Guild.name}!`);
  client.channels.get(Channel.id).send(`${member.username} is buttered up and has joined for the first time!`); 
};
