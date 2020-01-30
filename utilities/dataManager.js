const sqlite = require("better-sqlite3");
const dbDir = require("../assets/settings.json")["database"];

/** 
 * Manages the SQLite database
 * @param { string } args - An action for the database. Either init, add, select, update, or delete 
 * @param { string|string[] } values - An array of values for the add, select, and update actions. 
 * Select needs one value, while both add and update need two.
 * @param { string } table - Target table in the database.
 * @returns {Object} If action was select. Returns null for all other options.
*/
module.exports = function dataManager(args, values, table) {
    let db = new sqlite(dbDir);

    switch (args) {
        case "init":
            const tableCheck = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='users';").get();

            if(tableCheck["count(*)"]) { return console.log("SQLite Database exists! Skipping creation step..."); } //Prevent crashing if SQLite database exists already

            db.prepare("CREATE TABLE users (userID TEXT, credits INTEGER, rep INTEGER, cooldowns TEXT, profiles TEXT)").run();
            db.prepare("CREATE TABLE awards (userID TEXT, suggest INTEGER, bug INTEGER, minor INTEGER, major INTEGER)").run();
            db.prepare("CREATE TABLE stats (statName TEXT, count INTEGER)").run();

            db.prepare("INSERT INTO awards (userID, suggest, bug, minor, major) VALUES (?, ?, ?, ?, ?)").run("Overall", 0, 0, 0, 0);
            db.prepare("INSERT INTO stats (statName, count) VALUES (?, ?)").run("report", 0);
            
            db.prepare("CREATE TABLE fishing (userID TEXT, trash INTEGER, fish INTEGER, crab INTEGER, squid INTEGER, shark INTEGER)").run();
            db.prepare("CREATE TABLE harvest (userID TEXT, potato INTEGER, egg INTEGER, bread INTEGER, chocolate INTEGER, greenapple INTEGER, apple INTEGER, lemon INTEGER, rice INTEGER)").run();
            db.prepare("CREATE TABLE product (userID TEXT, recycle INTEGER, fishcake INTEGER, cookie INTEGER, oden INTEGER, sushi INTEGER, sake INTEGER)").run();
            return;
        case "add":
            var data = db.prepare("SELECT * FROM users WHERE userID=?").get(values);
            if (data) { return console.log("ERROR: This user already exists"); }
                    
            db.prepare("INSERT INTO users (userID, credits, rep, cooldowns, profiles) VALUES (?, ?, ?, ?, ?)").run(values, 100, 0, JSON.stringify({ credit: Date.now(), rep: null }), JSON.stringify({ Anilist: "", MAL: "" }));
            db.prepare("INSERT INTO awards (userID) VALUES (?)").run(values);

            db.prepare("INSERT INTO fishing (userID) VALUES (?)").run(values);
            db.prepare("INSERT INTO harvest (userID) VALUES (?)").run(values);
            db.prepare("INSERT INTO product (userID) VALUES (?)").run(values);
            break;
        case "select":
            var data;
            switch (table) {
                case "users":
                    data = db.prepare("SELECT * FROM users WHERE userID=?").get(values);
                    break;
                case "awards":
                    data = db.prepare("SELECT * FROM awards WHERE userID=?").get(values);
                    break;
                case "fishing":
                    data = db.prepare("SELECT * FROM fishing WHERE userID=?").get(values);
                    break;
                case "harvest":
                    data = db.prepare("SELECT * FROM harvest WHERE userID=?").get(values);
                    break;
                case "product":
                    data = db.prepare("SELECT * FROM product WHERE userID=?").get(values);
                    break;
                case "stats":
                    data = db.prepare("SELECT * FROM stats WHERE statName=?").get(values);
                    break;
                default:
                    console.log("ERROR: Table not found.");
                    return false;
            }

            return data;
        case "update":
            switch (table) {
                case "users":
                    db.prepare(`UPDATE users SET ${values[0]} WHERE userID=?`).run(values[1]);
                    break;
                case "awards":
                    db.prepare(`UPDATE awards SET ${values[0]} WHERE userID=?`).run(values[1]);
                    break;
                case "fishing":
                    db.prepare(`UPDATE fishing SET ${values[0]} WHERE userID=?`).run(values[1]);
                    break;
                case "harvest":
                    db.prepare(`UPDATE harvest SET ${values[0]} WHERE userID=?`).run(values[1]);
                    break;
                case "product":
                    db.prepare(`UPDATE product SET ${values[0]} WHERE userID=?`).run(values[1]);
                    break;
                case "stats":
                    db.prepare(`UPDATE stats SET ${values[0]} WHERE statName=?`).run(values[1]);
                    break;
                default:
                    console.log("ERROR: Table not found.");
                    return false;
            }
            break;
        case "delete":
            var data = db.prepare("SELECT * FROM users WHERE userID=?").get(values);
            if (!data) { return console.log("ERROR: This user doesn't exists"); }

            db.prepare("DELETE FROM users WHERE userID=?").run(values);
            db.prepare("DELETE FROM awards WHERE userID=?").run(values);

            db.prepare("DELETE FROM fishing WHERE userID=?").run(values);
            db.prepare("DELETE FROM harvest WHERE userID=?").run(values);
            db.prepare("DELETE FROM product WHERE userID=?").run(values);
            break;
    }
};