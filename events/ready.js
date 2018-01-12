const moment = require("moment");

exports.run = async client => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");
        
    await db.get("SELECT * FROM scores WHERE userId = 1", [], (err, row) => { if (err) { return client.funcs.sqlTables(client, "", "", "init"); } else { return; } });
    await db.close();
    await client.user.setPresence({ activity:  { name: ` ${client.config.prefix}help  | Playing around with ${client.owner.username}`, type: 0 } });
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] This is ${client.user.username} speaking! Online and awaiting orders!`);
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Current status: Serving ${client.guilds.size} guilds and ${client.users.size} people.`);
};
