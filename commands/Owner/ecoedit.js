exports.run = async (client, message, [member, option, amount]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    var data = await client.funcs.userSearch(message, {user: [member], tags: ["bot"], name: this.help.name});
    if (data.valid === false) { return; }

    db.get(`SELECT * FROM scores WHERE userId = "${data.user[0].id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("That user does not have any data within the database."); }
        else {
            db.run(`UPDATE scores SET ${option} = ${amount} WHERE userId ="${data.user[0].id}"`);
            return message.reply(`Table updated. I have updated the table so that ${user.prefered}'s ${option} has been set to ${amount}!`);
        }
    });
    
    if (user.bot === true) { return message.reply("You can't change or add data about a bot user!"); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 10,
    botPerms: [],
    requiredFuncs: ["userSearch"],
};
  
exports.help = {
    name: "ecoedit",
    description: "Edits a user's economy values.",
    usage: "[member:str] [option:str] [amount:int]",
    usageDelim: " ",
};