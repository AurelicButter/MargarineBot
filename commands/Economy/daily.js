const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./assets/data/score.sqlite");
let talk = require("../../assets/speech.json");

exports.run = async (client, msg, [user]) => {
    var data = await client.funcs.userSearch(msg, {user: [user], tags:["bot"], name: this.help.name});
    if (data.valid === false) { return; }
    user = data.user[0];

    var type = (user.id === msg.author.id) ? "self" : "other";

    var info = []; var talk1 = talk;
    db.serialize(function() {
        db.each(`SELECT daily, credits FROM scores WHERE userId IN ("${msg.author.id}", "${user.id}")`, function (err, row) {
            if (err) { return console.log(err); }
            if (!row) { 
                if (type === "self") { client.funcs.sqlTables(user, "add"); }
                else if (type === "other") { info.push("noRow"); }
            } else if (Number(row.daily) + 86400000 > Date.now()) { info.push("multi"); }
            else { info.push(type); }
            info.push(row.credits);
        }, function() {
            var valid = (type !== info[0]) ? false : true;
            if (info[2] !== "noRow") { talk1 = talk1["daily"]; }
            var x = 0;

            if (valid === true) {
                var credit = (type === "other") ? Number((100 * (1 + Math.random())).toFixed(0)) : 100; 
                if (info[2] === "multi" || info[2] === "noRow") { var x = 2; }
                else { 
                    db.run(`UPDATE scores SET daily = ${Date.now()} WHERE userId = ${msg.author.id}`);
                    db.run(`UPDATE scores SET credits = ${info[1] + credit} WHERE userId = ${user.id}`);
                }
            }
        
            msg.channel.send(talk1[info[x]][Math.floor(Math.random() * talk1[info[x]].length)].replace('-user-', user.prefered).replace('-credit-', credit));
        });
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["sqlTables", "userSearch"]
};
  
exports.help = {
    name: "daily",
    description: "Get a daily amount of credits or give them to someone else.",
    usage: "[user:str]",
    humanUse: "(user)"
};