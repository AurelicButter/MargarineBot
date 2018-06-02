exports.run = async (client, msg, [user, credit]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    var data = await client.funcs.userSearch(msg, {user: [user], tags:["bot"], name: this.help.name});
    if (data.valid === false) { return; }
    user = data.user[0];

    if (user.id === msg.author.id) { return msg.channel.send("Why are you trying to exchange credits to yourself? I doubt you are that lonely in life."); }

    db.get(`SELECT credits FROM scores WHERE userId = "${msg.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return msg.reply("You haven't signed up and received your credits yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); } 
        if (row.credits < credit) { return msg.reply("You don't have that many credits, baka!"); }
            
        db.get(`SELECT credits FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
            if (!row) { return msg.reply("That user has not gotten their first daily yet!"); }
            db.run(`UPDATE scores SET credits = ${Number(row.credits) + credit} WHERE userId = ${user.id}`);
        });

        db.run(`UPDATE scores SET credits = ${Number(row.credits) - credit} WHERE userId = ${msg.author.id}`); 
    });
    db.close();

    msg.reply(`You have given ${credit} credits to ${user.prefered}`);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"],
    cooldown: 10,
};
  
exports.help = {
    name: "exchange",
    description: "Give someone some of your credits.",
    usage: "[user:str] [credit:int]",
    usageDelim: " ",
    humanUse: "(Required: User)_(Required: Credit)"
};