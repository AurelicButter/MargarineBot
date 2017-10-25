const moment = require("moment");

exports.run = async client => {
    await client.user.setPresence({ activity:  { name:` m~help  | Playing around with Butter on ${client.guilds.size} servers`, type: 0 } });
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] This is Margarine speaking! Online and awaiting orders!`);
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Current status: Serving ${client.guilds.size} guilds and ${client.users.size} people.`);
};
