const moment = require("moment");

exports.run = async client => {
    const sql = require("sqlite");
    sql.open("./bwd/data/score.sqlite");

    await client.user.setPresence({ activity:  { name:` m~help  | Playing around with Butter on ${client.guilds.size} servers`, type: 0 } });
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] This is Margarine speaking! Online and awaiting orders!`);
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Current status: Serving ${client.guilds.size} guilds and ${client.users.size} people.`);
    await sql.get(`SELECT * FROM scores WHERE userId = "${client.user.id}"`).then(row => { if (!row) { return; } else { return; } }).catch(error => { return; });
};
