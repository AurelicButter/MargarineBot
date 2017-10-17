const moment = require("moment");

module.exports = (client, message, user) => {
    const sql = require("sqlite");
    sql.open(`./bwd/data/score.sqlite`);

    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, credits INTEGER, level INTEGER, daily TEXT, rep INTEGER, repDaily TEXT)").then(() => {
        sql.run("INSERT INTO scores (userId, credits, level, daily, rep, repDaily) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0, 0]);
    });
    sql.run("CREATE TABLE IF NOT EXISTS fish_inv (userId TEXT, common INTEGER, uncommon INTEGER, rare INTEGER, ultraRare INTEGER, trash INTERGER)").then(() => {
        sql.run("INSERT INTO fish_inv (userId, common, uncommon, rare, ultraRare, trash) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0, 0]);
    });
    sql.run("CREATE TABLE IF NOT EXISTS fish_stats (userId TEXT, common INTEGER, uncommon INTEGER, rare INTEGER, ultraRare INTEGER, trash INTERGER)").then(() => {
        sql.run("INSERT INTO fish_stats (userId, common, uncommon, rare, ultraRare, trash) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0, 0]);
    });
    sql.run("CREATE TABLE IF NOT EXISTS badges (userId TEXT, bugTester TEXT, betaTester TEXT)").then(() => {
        sql.run("INSERT INTO badges (userId, betaTester, bugSmasher) VALUES (?, ?, ?)", [user.id, "no", "no"]);  
    });

    console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Scores database created.`);
    Report = `Database has been created and is ready to collect.`;
    
    return Report;
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "sqlTables",
  type: "functions",
  description: "Creates a table if there is no table to store data on.",
};
