exports.run = async (client, message, [user]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    user = client.funcs.userSearch(message, {user: user, bot: true});	
    if (user === undefined) { return; }

    if (user.id === message.author.id) {
        db.get(`SELECT daily, credits FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) {
                client.funcs.sqlTables(client, message, user, "add");
                return message.channel.send("You have received your daily amount of 100 credits."); 
            } else if ((Number(row.daily) + 86400000) > Date.now()) { return message.reply("You have already redeemed your daily for today."); } 
            else {
                db.run(`UPDATE scores SET daily = ${Date.now()}, credits = ${Number(row.credits) + 100} WHERE userId = ${user.id}`);
                return message.channel.send(`You have received 100 credits! You should buy me a game of chouhan with that.`);
            }
        });
    } else {
        db.get(`SELECT daily FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => {
            if (err) { return console.log(err); }
            if (!row) { return message.reply("You have not gotten your first daily yet. Before giving credits to others, you must recieve the daily!"); }
            if ((Number(row.daily) + 86400000) > Date.now()) { return message.reply("You have already redeemed your daily for today."); }
        });

        db.get(`SELECT credits FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
            if (!row) { return message.channel.send("That user has not gotten their first daily to start off with so you can not give them any credits at the moment. :cry:"); } 
            else {
                var credit = Number((100 * (1 + Math.random())).toFixed(0)); 
                db.run(`UPDATE scores SET daily = ${Date.now()} WHERE userId = ${message.author.id}`);
                db.run(`UPDATE scores SET credits = ${Number(row.credits) + credit} WHERE userId = ${user.id}`);
                message.channel.send(`${user.username} has received ${credit} credits.`);
            }
        });
    }
    db.close();
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
    usageDelim: "",
    humanUse: "(user)"
};