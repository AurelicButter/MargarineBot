exports.run = async (client, message, [member]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");

    var user = client.funcs.userSearch(client, message, member);
    
    if (user.username === undefined) { return; }
    if (user.bot === true) { return message.reply("You can't give your credits to a bot user!"); }

    db.get(`SELECT * FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) {
            if (user.id === message.author.id) { 
                db.run("INSERT INTO scores (userId, credits, level, daily, rep, repDaily) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 100, 0, Date.now(), 0, 0]);
                db.run("INSERT INTO fish_inv (userId, common, uncommon, rare, epic, trash) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0, 0]);
                db.run("INSERT INTO fish_stats (userId, common, uncommon, rare, epic, trash) VALUES (?, ?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0, 0]);
                db.run("INSERT INTO badges (userId, betaTester, bugSmasher) VALUES (?, ?, ?)", [user.id, "no", "no"]);  
                db.run("INSERT INTO awards (userId, suggest, bugs, minor, major) VALUES (?, ?, ?, ?, ?)", [user.id, 0, 0, 0, 0]);  
                return message.channel.send("You have received your daily amount of 100 credits."); 
            } else { 
                db.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => { 
                    if (err) { return console.log(err); }
                    if (!row) { return message.reply("You have not gotten your first daily yet. Before giving credits to others, you must recieve the daily!"); }
                });
                return message.channel.send("That user has not gotten their first daily to start off with so you can not give them any credits at the moment. :cry:"); 
            }
        } if (user.id !== message.author.id) {
            var credit = Number((100 * (1 + Math.random())).toFixed(0)); 
            db.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => {
                if ((Number(row.daily) + 86400000) > Date.now()) {
                    return message.reply("You have already redeemed your daily for today."); 
                } else {
                    db.run(`UPDATE scores SET daily = ${Date.now()} WHERE userId = ${message.author.id}`);
                    db.get(`SELECT * FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
                        if (err) { return console.log(err); }
                        db.run(`UPDATE scores SET credits = ${Number(row.credits) + credit} WHERE userId = ${user.id}`);
                    });
                    return message.channel.send(`${user.username} has received ${credit} credits.`);
                }
            });
        } else {
            if ((Number(row.daily) + 86400000) > Date.now()) {
                return message.reply("You have already redeemed your daily for today."); 
            } else {
                credit = row.credits + 100;
                db.run(`UPDATE scores SET daily = ${Date.now()} WHERE userId = ${user.id}`);
                db.run(`UPDATE scores SET credits = ${row.credits + 100} WHERE userId = ${user.id}`);
                return message.channel.send(`${user.username} has received ${credit - row.credits} credits.`);
            }
        }
    });
    db.close();
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "daily",
    description: "Get a daily amount of credits or give them to someone else.",
    usage: "[member:str]",
    usageDelim: "",
};