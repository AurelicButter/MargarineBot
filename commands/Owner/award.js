exports.run = async (client, message, [user, credit, text]) => {
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

    const embed = new client.methods.Embed()
        .setColor("#04d5fd")
        .setTimestamp()
        .setTitle(`Award Notification!`)
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
    requiredFuncs: [],
};
  
exports.help = {
    name: "award",
    description: "Awards a user for finding an issue with Margarine.",
    usage: "[user:str] [credit:int] [text:str]",
    usageDelim: " | ",
};
