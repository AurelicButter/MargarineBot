const moment = require("moment");

exports.run = (client, guild) => {
    var Guild = guild.guild;
    var member = guild.user;
  
    let Channel = client.funcs.defaultChannel(client, Guild);
    client.channels.get(Channel.id).send(`${member.username} has left the server. Good luck out there!`); 
};