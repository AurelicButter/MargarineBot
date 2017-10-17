exports.run = async (client, message, [member, option, amount]) => {
    const sql = require("sqlite");
    sql.open("./bwd/data/score.sqlite");

    var user = client.funcs.userSearch(client, message, member);
    
    if (user.username === null || user.username === undefined) { return; }
    if (user.bot === true) { return message.reply("You can't change or add data about a bot user!"); }

    sql.get(`SELECT * FROM scores WHERE userId = "${user.id}"`).then(row => {
        if (!row) { return message.reply("That user does not have any data within the database."); }
        else {
            sql.run(`UPDATE scores SET ${option} = ${amount} WHERE userId ="${user.id}"`);
            return message.reply(`Table updated. I have updated the table so that ${user.username}'s ${option} has been set to ${amount}!`);
        }
    }).catch(error => { 
        console.log(error);
        return message.reply("Error in command. Please try again later.");
    });
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
    name: "ecoedit",
    description: "Edits a user's economy values.",
    usage: "[member:str] [option:str] [amount:int]",
    usageDelim: " ",
};
