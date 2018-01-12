exports.run = async (client, message, [user, note]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");
    const prefix = message.guildSettings.prefix || client.config.prefix;
    var text = message.content.slice(prefix.length + user.length + 5);

    user = client.funcs.userSearch(client, message, user);
            
    if (user.username === undefined) { return; }
    if (user.bot === true) { return message.channel.send("You can't give rep to a bot user!"); }
    if (user.id === message.author.id) { return message.channel.send("You can't give rep to yourself! That's like saying hire me for your nuclear plant because I'm a high school student!"); }
    var mention = note ? user.tag : "<@" + user.id + ">"; 

    db.get(`SELECT repDaily, rep FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("You have not redeemed your first daily yet!"); }
        if ((parseInt(row.repDaily) + 86400000) > Date.now()) { return message.reply("You've already have given someone else rep today!"); }
        else {        
            db.get(`SELECT repDaily, rep FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
                if (!row) { return message.channel.send("That user has not gotten their first daily to start off with so you can not give them any rep at the moment. :cry:"); } 
                else {
                    db.run(`UPDATE scores SET rep = ${row.rep + 1} WHERE userId = ${user.id}`);
                    db.run(`UPDATE scores SET repDaily = ${Date.now()} WHERE userId = ${message.author.id}`);
                    if (note) { user.send("Delivery here! Someone has included a note with your rep!\n\n" + text + "\n-" + message.author.tag); } 
                    message.channel.send("You have given" + mention + "a reputation point!"); 
                }
            });
        }
    });
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
    usage: "[user:str] [note:str] [...]",
    usageDelim: " ",
    humanUse: "(Required: User)_(Optional: Note)"
};