const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./assets/data/score.sqlite");

exports.run = async (client, message, [user]) => {
    var data = await client.funcs.userSearch(message, {user: [user], tags:["bot"], name: this.help.name});
    if (data.valid === false) { return; }
    user = data.user[0];

    var baka = (user.id === message.author.id) ? "self" : "other";

    this.dbChecker(client, [message.author, user], baka, function (text) {
        if (text.valid === true) {
            var credit = (baka === "other") ? Number((100 * (1 + Math.random())).toFixed(0)) : 100; 
            if (baka === "other") {
                db.run(`UPDATE scores SET daily = ${Date.now()} WHERE userId = ${message.author.id}`);
                db.run(`UPDATE scores SET credits = ${text.credits + credit} WHERE userId = ${user.id}`);
            } else { db.run(`UPDATE scores SET daily = ${Date.now()}, credits = ${text.credits + credit} WHERE userId = ${user.id}`); }
        }
    
        message.channel.send(text.text.replace('-user-', user.prefered).replace('-credit-', credit));
    
        db.close();
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["sqlTables", "userSearch"],
};
  
exports.help = {
    name: "daily",
    description: "Get a daily amount of credits or give them to someone else.",
    usage: "[user:str]",
    humanUse: "(user)"
};

exports.dbChecker = function (client, user, type, callback) {
    let talk = require("../../assets/speech.json");
    var check = type;
    var data = [];
    db.serialize(function() {
        db.each(`SELECT daily, credits FROM scores WHERE userId IN ("${user[0].id}", "${user[1].id}")`, function (err, row) {
            if (err) { return console.log(err); }
            if (!row) { 
                if (type === "self") { client.funcs.sqlTables(user, "add"); }
                else if ( type === "other") { type === "noRow"; }
                else { type === "noRow"; check === false; } 
            } else if ((Number(row.daily) + 86400000) > Date.now()) { type === "multi"; }
            data.push(type, row.credits)
        }, function() { 
            var valid = (check !== data[0]) ? false : true;
            talk = (check === false) ? talk : talk["daily"];
    
            callback({ 
                valid: valid, 
                text: talk[data[0]][Math.floor(Math.random() * talk[data[0]].length)],
                credits: data[1]
            });
        });
    });
}