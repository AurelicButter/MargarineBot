const moment = require("moment");

exports.run = (client, guild) => {
  var Guild = guild.guild;
  var member = guild.user;

  var Channel = client.funcs.defaultChannel(client, Guild);

  console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] New User at ${Guild.name}!`);
  client.channels.get(Channel.id).send(`${member.username} is buttered up and has joined the server!`); 
};
