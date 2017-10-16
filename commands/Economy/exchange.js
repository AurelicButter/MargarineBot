exports.run = async (client, message, [user, credit]) => {
    const sql = require("sqlite");
    sql.open("./bwd/data/score.sqlite");

    var user = client.funcs.userSearch(client, message, user);
    
    if (user.username === null || user.username === undefined) { return; }
    if (user.bot === true) { return message.reply("You can't give your credits to a bot user!"); }

    sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        if (!row) { return message.reply("You haven't signed up and received your credits yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); } 
        if (row.credits < credit) { return message.reply("You don't have that many credits, baka!"); }
        if (!credit || credit < 1) { return message.reply("You can't just give an invisable amount of credits to someone!"); }
        else { 
            sql.get(`SELECT * FROM scores WHERE userId = "${user.id}"`).then(row => {
                if (!row) { return message.reply("That user has not gotten their first daily yet!"); }
                else { sql.run(`UPDATE scores SET credits = ${parseInt(row.credits) + parseInt(credit)} WHERE userId = ${user.id}`); }
            });
            sql.run(`UPDATE scores SET credits = ${parseInt(row.credits) - parseInt(credit)} WHERE userId = ${message.author.id}`); 
        }
    }).catch(error => { 
        console.log(error);
        return message.reply("Error in command. Please try again later.");
    });

    message.reply(`You have given ${credit} credits to ${user.username}`);
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
