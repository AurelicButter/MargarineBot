module.exports = (user, client) => {
    const sqlite3 = require("sqlite3").verbose();
    let sql = new sqlite3.Database(client.database.inv);
    let db = new sqlite3.Database(client.database.general);

    if (user == "-init") {
		db.run("CREATE TABLE IF NOT EXISTS users (userID TEXT, credits INTEGER, level INTEGER, profiles TEXT, dailies TEXT, rep INTEGER)");
        db.run("CREATE TABLE IF NOT EXISTS awards (userID TEXT, suggest INTEGER, bugs INTEGER, minor INTEGER, major INTEGER)", [], (err, row) => {
            if (err) { return console.log(err); }
            db.run("INSERT INTO awards (userID, suggest, bugs, minor, major) VALUES (?, ?, ?, ?, ?)", ["Overall", 0, 0, 0, 0]);
        });
        db.run("CREATE TABLE IF NOT EXISTS stats (statName TEXT, reportNumber INTEGER)", [], (row) => {
            db.run("INSERT INTO stats (statName, count) VALUES (?, ?)", ["report", 0]);
        });
        db.close();
        
        sql.run("CREATE TABLE IF NOT EXISTS material (userID TEXT, trash INTEGER, fish INTEGER, crab INTEGER, squid INTEGER, shark INTERGER, potato INTERGER, egg INTERGER, bread INTERGER, chocolate INTERGER, greenapple INTERGER, apple INTERGER, lemon INTERGER, sake INTERGER, rice INTERGER)");
        sql.run("CREATE TABLE IF NOT EXISTS product (userID TEXT, fishcake INTEGER, cookie INTEGER, oden INTEGER, sushi INTEGER, recycle INTEGER)");
        sql.close();
    } else {
		db.run("INSERT INTO users (userID, credits, level, dailies, rep) VALUES (?, ?, ?, ?, ?)", [user.id, 100, 0, JSON.stringify({ credit: Date.now(), rep: null }), 0]);
        db.run("INSERT INTO awards (userID) VALUES (?)", [user.id]);  
        db.close();

        sql.run("INSERT INTO material (userID) VALUES (?)", [user.id]);
        sql.run("INSERT INTO product (userID) VALUES (?)", [user.id]);
        sql.close();
    }
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "sqlTables",
  type: "functions",
  description: "Creates a table if there is no table to store data on."
};