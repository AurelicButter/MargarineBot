module.exports = (user, type) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");
    let sql = new sqlite3.Database("./assets/data/inventory.sqlite");

    if (type === "init") {
        db.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, credits INTEGER, level INTEGER, daily TEXT, rep INTEGER, repDaily TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS fish_stats (userId TEXT, trash INTEGER, fish INTEGER, crab INTEGER, squid INTEGER, shark INTERGER)");
        db.run("CREATE TABLE IF NOT EXISTS badges (userId TEXT, bugTester TEXT, betaTester TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS awards (userId TEXT, suggest INTEGER, bugs INTEGER, minor INTEGER, major INTEGER)", [], (err, row) => {
            if (err) { return console.log(err); }
            db.run("INSERT INTO awards (userId, suggest, bugs, minor, major) VALUES (?, ?, ?, ?, ?)", ["Overall", 0, 0, 0, 0]);
        });
        db.run("CREATE TABLE IF NOT EXISTS stats (statName TEXT, reportNumber INTEGER)", [], (row) => {
            db.run("INSERT INTO stats (statName, reportNumber) VALUES (?, ?)", ["report", 0]);
        });
        db.close();
        
        sql.run("CREATE TABLE IF NOT EXISTS material (userId TEXT, trash INTEGER, fish INTEGER, crab INTEGER, squid INTEGER, shark INTERGER, potato INTERGER, egg INTERGER, bread INTERGER, chocolate INTERGER, greenapple INTERGER, apple INTERGER, lemon INTERGER, sake INTERGER, rice INTERGER)");
        sql.run("CREATE TABLE IF NOT EXISTS product (userId TEXT, fishcake INTEGER, cookie INTEGER, oden INTEGER, sushi INTEGER)");
        sql.close();
    } if (type === "add") {
        db.run("INSERT INTO scores (userId, credits, level, daily, rep, repDaily) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 100, 0, Date.now(), 0, 0]);
        db.run("INSERT INTO fish_stats (userId, trash, fish, crab, squid, shark) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0, 0]);
        db.run("INSERT INTO badges (userId) VALUES (?)", [user.id]);  
        db.run("INSERT INTO awards (userId) VALUES (?)", [user.id]);  
        db.close();

        sql.run("INSERT INTO material (userId) VALUES (?)", [user.id]);
        sql.run("INSERT INTO product (userID) VALUES (?)", [user.id]);
        sql.close();
    }
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "sqlTables",
  type: "functions",
  description: "Creates a table if there is no table to store data on.",
};