const moment = require("moment");

exports.run = (client, guild) => {
    console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] I have stopped providing for ${guild.name}.`);
    if (!guild.available) { return; }
    client.configuration.remove(guild);
};
