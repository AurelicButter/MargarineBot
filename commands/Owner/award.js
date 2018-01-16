exports.run = async (client, message, [user, credit, text]) => {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("./assets/data/score.sqlite");

    var user = client.funcs.userSearch(client, message, user);
    
    if (user.username === null) { return; }
    if (user.bot === true) { return message.reply("You can't give your credits to a bot user!"); }

    db.get(`SELECT * FROM scores WHERE userId = "${user.id}"`, [], (err, row) => {
        if (err) { return console.log(err); }
        if (!row) { return message.reply("That user has not gotten their first daily yet!"); }
        if (!credit || credit < 1) { return message.reply("You can't just give an invisable amount of credits to someone!"); }
        else { 
            db.run(`UPDATE scores SET credits = ${Number(row.credits) + Number(credit)} WHERE userId = ${user.id}`); 
            db.get("SELECT * FROM awards WHERE userID = 'Overall'", [], (err, row) => {
                if (err) { return console.log(err); }
                if (credit === 150) { 
                    db.run(`UPDATE awards SET suggest = ${Number(row.suggest) + 1} WHERE userId = "Overall"`);
                } if (credit === 250) {
                    db.run(`UPDATE awards SET bugs = ${Number(row.bugs) + 1} WHERE userId = "Overall"`);
                } if (credit === 500) {
                    db.run(`UPDATE awards SET minor = ${Number(row.minor) + 1} WHERE userId = "Overall"`);
                } if (credit === 1000) {
                    db.run(`UPDATE awards SET major = ${Number(row.major) + 1} WHERE userId = "Overall"`);
                }
            });
            db.get(`SELECT * FROM awards WHERE userID = "${user.id}"`, [], (err, row) => {
                if (err) { return console.log(err); }
                if (!row) { console.log(`No row for ${user.id}. Please manually add with the given amount ${credit}.`); }
                if (credit === 150) { 
                    db.run(`UPDATE awards SET suggest = ${Number(row.suggest) + 1} WHERE userId = "${user.id}"`); 
                } if (credit === 250) {
                    db.run(`UPDATE awards SET bugs = ${Number(row.bugs) + 1} WHERE userId = "${user.id}"`); 
                } if (credit === 500) {
                    db.run(`UPDATE awards SET minor = ${Number(row.minor) + 1} WHERE userId = "${user.id}"`); 
                } if (credit === 1000) {
                    db.run(`UPDATE awards SET major = ${Number(row.major) + 1} WHERE userId = "${user.id}"`); 
                }
            });
        }
    });

    const embed = new client.methods.Embed()
        .setColor("#04d5fd")
        .setTimestamp()
        .setTitle("Award Notification!")
        .addField(`User: ${user.tag}`, `For the reason of: ${text}`)
        .addField("Award:", `${credit} credits`)
        .setThumbnail(user.avatarURL());

    message.reply(`<@${user.id}> (${user.id}) have been awarded ${credit} credits!`);
    client.channels.get("364846541455753218").send({embed});
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
    name: "award",
    description: "Awards a user for finding an issue with Margarine.",
    usage: "[user:str] [credit:int] [text:str]",
    usageDelim: " | ",
};