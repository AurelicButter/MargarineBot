const moment = require("moment");
const fs = require("fs");

exports.run = async client => {
    //Init storage areas.
    if (!fs.existsSync("./assets/data")) { fs.mkdirSync("./assets/data"); }
        
    //Inits the databases
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database(client.database.general);
    let sql = new sqlite3.Database(client.database.inv);

    await db.get("SELECT * FROM users WHERE userId = 1", [], (err, row) => { if (err) { return client.funcs.sqlTables("-init"); } else { return; } });
    await db.close();
    await sql.get("SELECT * FROM material WHERE userId = 1", [], (err, row) => { if (err) { return; } else { return; }});
    await sql.close();

    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] This is ${client.user.username} speaking! Online and awaiting orders!`);
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Current status: Serving ${client.guilds.size} guilds and ${client.users.size} people.`);

    await client.funcs.presenceHelper(client, "-start"); //Inits the presence timer.
};