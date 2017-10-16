exports.run = async (client, message, [user, credit]) => {
    const sql = require("sqlite");
    sql.open("./bwd/data/score.sqlite");

    var user = client.funcs.userSearch(client, message, user);
    
    if (user.username === null || user.username === undefined) { return; }
    if (user.bot === true) { return message.reply("You can't give your credits to a bot user!"); }

    sql.get(`SELECT * FROM scores WHERE userId = "${user.id}"`).then(row => {
        if (!row) { return message.reply("That user has not gotten their first daily yet!"); }
        if (!credit || credit < 1) { return message.reply("You can't just give an invisable amount of credits to someone!"); }
        else { sql.run(`UPDATE scores SET credits = ${parseInt(row.credits) + parseInt(credit)} WHERE userId = ${user.id}`); }
    }).catch(error => { 
        console.log(error);
        return message.reply("Error in command. Please try again later.");
    });

    message.reply(`${user.username} (${user.id}) have been awarded ${credit} credits!`);
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 10,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "award",
    description: "Awards a user for finding an issue with Margarine.",
    usage: "[user:str] [credit:int]",
    usageDelim: " ",
};
