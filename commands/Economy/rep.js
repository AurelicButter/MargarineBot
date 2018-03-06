exports.run = async (client, msg, [user, ...note]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    var data = await client.funcs.userSearch(msg, {user: [user], tags:["bot"], name: this.help.name});
    if (data.valid == false) { return; }
        
    user = data.user[0];
    if (user.id === msg.author.id) { return msg.channel.send("You can't give rep to yourself! That's like saying hire me for your nuclear plant because I'm a high school student!"); }
    var mention = note ? user.tag : user.ping; 

    db.get(`SELECT repDaily, rep FROM scores WHERE userId = "${msg.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return msg.reply("You have not redeemed your first daily yet!"); }
        if ((parseInt(row.repDaily) + 86400000) > Date.now()) { return msg.reply("You've already have given someone else rep today!"); }
        else {        
            db.get(`SELECT rep FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
                if (!row) { return msg.channel.send("That user has not gotten their first daily to start off with so you can not give them any rep at the moment. :cry:"); } 
                else {
                    db.run(`UPDATE scores SET rep = ${row.rep + 1} WHERE userId = ${user.id}`);
                    db.run(`UPDATE scores SET repDaily = ${Date.now()} WHERE userId = ${msg.author.id}`);
                    if (note) { user.send("Delivery here! Someone has included a note with your rep!\n\n" + note.join(" ") + "\n-" + msg.author.tag); } 
                    msg.channel.send("You have given " + mention + " a reputation point!"); 
                }
            });
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
    requiredFuncs: ["userSearch"],
};
  
exports.help = {
    name: "rep",
    description: "Give someone a reputation point!",
    usage: "[user:str] [note:str][...]",
    usageDelim: " ",
    humanUse: "(Required: User)_(Note)"
};