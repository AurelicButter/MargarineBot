const moment = require("moment");

module.exports = (client, message, name, user) => {
    const sql = require("sqlite");
    sql.open(`./bwd/data/${name}.sqlite`);

    if (name === "badges") {
        sql.run("CREATE TABLE IF NOT EXISTS badges (userId TEXT, bugTester TEXT, betaTester TEXT)").then(() => {
            sql.run("INSERT INTO badges (userId, bugTester, betaTester) VALUES (?, ?, ?)", [user.id, "no", "no"]);  
        });
        console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Badge database created.`);
        Report = `Database has been created and is ready to collect.`;
    }
    if (name === "score") {
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, credits INTEGER, level INTEGER, daily TEXT)").then(() => {
            sql.run("INSERT INTO scores (userId, credits, level, daily) VALUES (?, ?, ?, ?)", [user.id, 0, 0, 0]);
        });
        sql.run("CREATE TABLE IF NOT EXISTS fish_inv (userId TEXT, common INTEGER, uncommon INTEGER, rare INTEGER, ultraRare INTEGER, trash INTERGER)").then(() => {
            sql.run("INSERT INTO fish_inv (userId, common, uncommon, rare, ultraRare, trash) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0, 0]);
        });
        sql.run("CREATE TABLE IF NOT EXISTS fish_stats (userId TEXT, common INTEGER, uncommon INTEGER, rare INTEGER, ultraRare INTEGER, trash INTERGER)").then(() => {
            sql.run("INSERT INTO fish_stats (userId, common, uncommon, rare, ultraRare, trash) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0, 0]);
        });
        console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Scores database created.`);
        Report = `Database has been created and is ready to collect.`;
    }
    else { Report = `Name is not correct. Would lead to an error across the commands. Recheck the function and command for correct usage.`; }
    
    return Report;
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "sqlTables",
  type: "functions",
  description: "Creates a table if there is no table to store data on.",
};
