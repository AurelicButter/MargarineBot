module.exports = (client, message, user) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");

    db.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, credits INTEGER, level INTEGER, daily TEXT, rep INTEGER, repDaily TEXT)", [], (err, row) => {
        if (err) { return console.log(err); }
        db.run("INSERT INTO scores (userId, credits, level, daily, rep, repDaily) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0, 0]);
    });
    db.run("CREATE TABLE IF NOT EXISTS fish_inv (userId TEXT, common INTEGER, uncommon INTEGER, rare INTEGER, epic INTEGER, trash INTERGER)", [], (err, row) => {
        if (err) { return console.log(err); }
        db.run("INSERT INTO fish_inv (userId, common, uncommon, rare, epic, trash) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0, 0]);
    });
    db.run("CREATE TABLE IF NOT EXISTS fish_stats (userId TEXT, common INTEGER, uncommon INTEGER, rare INTEGER, epic INTEGER, trash INTERGER)", [], (err, row) => {
        if (err) { return console.log(err); }
        db.run("INSERT INTO fish_stats (userId, common, uncommon, rare, epic, trash) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0, 0]);
    });
    db.run("CREATE TABLE IF NOT EXISTS badges (userId TEXT, bugTester TEXT, betaTester TEXT)", [], (err, row) => {
        if (err) { return console.log(err); }
        db.run("INSERT INTO badges (userId, betaTester, bugSmasher) VALUES (?, ?, ?)", [user.id, "no", "no"]);  
    });

    db.run("CREATE TABLE IF NOT EXISTS awards (userId TEXT, suggest INTEGER, bugs INTEGER, minor INTEGER, major INTEGER)", [], (err, row) => {
        if (err) { return console.log(err); }
        db.run("INSERT INTO awards (userId, suggest, bugs, minor, major) VALUES (?, ?, ?, ?, ?)", ["Overall", 0, 0, 0, 0]);
        db.run("INSERT INTO awards (userId, suggest, bugs, minor, major) VALUES (?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0]);  
    });

    db.run("CREATE TABLE IF NOT EXISTS stats (statName TEXT, reportNumber INTEGER)", [], (err, row) => {
        if (err) { return console.log(err); }
        db.run("INSERT INTO stats (statName, reportNumber) VALUES (?, ?)", ["report", 0]);
    });

    db.close();
    return "Database has been created and is ready to collect.";
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "sqlTables",
  type: "functions",
  description: "Creates a table if there is no table to store data on.",
};