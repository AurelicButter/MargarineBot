const moment = require("moment");

exports.run = async client => { 
    //await <Time ticking?>
    await client.user.setPresence({ game:  { name:` m~help  | Playing around with Butter on ${client.guilds.size} servers`, type: 0 } });
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] This is Margarine speaking!`);
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Online and awaiting orders!`);
};
