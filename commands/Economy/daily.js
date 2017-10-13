exports.run = async (client, message, [member]) => {
    const sql = require("sqlite");
    sql.open("./bwd/data/score.sqlite");

    var user = client.funcs.userSearch(client, message, member);
    
    if (user.username === null || user.username === undefined) { return; }
    if (user.bot === true) { return message.reply("You can't give your credits to a bot user!"); }

    sql.get(`SELECT * FROM scores WHERE userId = "${user.id}"`).then(row => {
        if (!row) {
            if (user.id == message.author.id) { 
                sql.run("INSERT INTO scores (userId, credits, level, daily) VALUES (?, ?, ?, ?)", [user.id, 100, 0, Date.now()]);
                return message.channel.send("You have recieved your daily amount of 100 credits."); 
            } else { 
                sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => { 
                    if (!row) { return message.reply("You have not gotten your first daily yet. Before giving credits to others, you must recieve the daily!"); }
                });
                return message.channel.send(`That user has not gotten their first daily to start off with so you can not give them any credits at the moment. ):`); 
            }
        } else if ((row.daily + 86400000) <= Date.now()) {
            if (user.id == message.author.id) { 
                credit = row.credits + 100;
                sql.run(`UPDATE scores SET daily = ${Date.now()} WHERE userId = ${user.id}`);
            } else { 
                credit = row.credits + (100 * (1 + Math.random())); 
            }
            sql.run(`UPDATE scores SET credits = ${row.credits + 100} WHERE userId = ${user.id}`);
            return message.channel.send(`${user.username} has recieved ${credit - row.credits} credits.`);
        } else { 
            return message.reply("You have already redeemed your daily for today."); 
        }
    }).catch(error => { 
        console.log(error);
        var Report = client.funcs.sqlTables(client, message, "score", user);
        return message.reply(Report);
    });
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
    description: "Get a daily amount of credits",
    usage: "[member:str]",
    usageDelim: "",
};
