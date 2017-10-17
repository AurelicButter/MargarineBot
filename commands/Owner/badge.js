exports.run = async (client, message, [member, option, amount]) => {
    const sql = require("sqlite");
    sql.open("./bwd/data/score.sqlite");

    if (member != null) {  
        var user = client.funcs.userSearch(client, message, member); 
        if (user.username === null || user.username === undefined) { return; }
        if (user.bot === true) { return message.reply("You can't change or add data about a bot user!"); }
    } else { return message.reply("You didn't provide me with a user!"); }

    if (!option) { return message.reply("I can't just give a person nothing!"); }

    sql.get(`SELECT * FROM badges WHERE userId = "${user.id}"`).then(row => {
        if (!row) { 
            if (option.toLowerCase() === "add") { 
                sql.run("INSERT INTO badges (userId, betaTester, bugSmasher) VALUES (?, ?, ?)", [user.id, "no", "no"]);
                return message.reply("User has been added into the table. You may now reward the person.");
            }
            else { return message.reply("That user does not have any data within the database. Please try again like this `m~badge <user> add`"); }
        } else {
            sql.run(`UPDATE badges SET ${option} = "${amount}" WHERE userId = "${user.id}"`);
            return message.reply(`Table updated. I have updated the table so that ${user.username} has earned the ${option} award!`);
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
    name: "badge",
    description: "Gives a user an award based on their efforts towards Margarine.",
    usage: "[member:str] [option:str] [yes|no]",
    usageDelim: " ",
};
