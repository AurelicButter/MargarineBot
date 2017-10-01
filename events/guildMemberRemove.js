const moment = require("moment");

exports.run = (client, guild) => {
    var Guild = guild.guild;
    var member = guild.user;
  
    let Channel = client.funcs.defaultChannel(client, Guild);

    console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] User left at ${Guild.name}!`);
    client.channels.get(Channel.id).send(`${member.username} has left the server. Good luck out there!`); 
};
