exports.run = async (client, message, [user, credit]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./bwd/data/score.sqlite");

    var user = client.funcs.userSearch(client, message, user);
    
    if (user.username === null || user.username === undefined) { return; }
    if (user.bot === true) { return message.reply("You can't give your credits to a bot user!"); }

    db.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("You haven't signed up and received your credits yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); } 
        if (row.credits < credit) { return message.reply("You don't have that many credits, baka!"); }
        if (!credit || credit < 1) { return message.reply("You can't just give an invisable amount of credits to someone!"); }
        else { 
            db.get(`SELECT * FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
                if (err) { return console.log(err); }
                if (!row) { return message.reply("That user has not gotten their first daily yet!"); }
                else { db.run(`UPDATE scores SET credits = ${parseInt(row.credits) + parseInt(credit)} WHERE userId = ${user.id}`); }
            });
            db.run(`UPDATE scores SET credits = ${parseInt(row.credits) - parseInt(credit)} WHERE userId = ${message.author.id}`); 
            message.reply(`You have given ${credit} credits to ${user.username}`);
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
    name: "exchange",
    description: "Give someone some of your credits.",
    usage: "[user:str] [credit:int]",
    usageDelim: " ",
};
