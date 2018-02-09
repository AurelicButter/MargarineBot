exports.run = async (client, message, [user, credit]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    user = client.funcs.userSearch(client, message, {user: user, bot: true});
    if (user === undefined) { return; }
    
    if (user.id === message.author.id) { return message.channel.send("Why are you trying to exchange credits to yourself? I doubt you are that lonely in life."); }

    if (!credit) { return message.reply("Credits? Hello? I need an amount of credits!"); }
    else if (credit < 0) { return message.reply("What are you trying to do? Steal someone's credits? That's illegal, you know."); }
    else if (credit === 0) { return message.reply("... No comment..."); }
    else if (Number.isInteger(credit) === false) { return message.reply("You can't split a credit! Give me a whole number."); }

    db.get(`SELECT credits FROM scores WHERE userId = "${message.author.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("You haven't signed up and received your credits yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); } 
        if (row.credits < credit) { return message.reply("You don't have that many credits, baka!"); }
    });
        
    db.get(`SELECT credits FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
        if (!row) { return message.reply("That user has not gotten their first daily yet!"); }
        else { db.run(`UPDATE scores SET credits = ${Number(row.credits) + credit} WHERE userId = ${user.id}`); }
    });
    db.run(`UPDATE scores SET credits = ${Number(row.credits) - credit} WHERE userId = ${message.author.id}`); 
    db.close();
    message.reply(`You have given ${credit} credits to ${user.username}`);
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