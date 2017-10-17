exports.run = async (client, message, [member]) => {
    const sql = require("sqlite");
    sql.open("./bwd/data/score.sqlite");

    var user = client.funcs.userSearch(client, message, member);
    
    if (user.username === null || user.username === undefined) { return; }
    if (user.bot === true) { return message.reply("Bots don't have credits!"); }

    sql.get(`SELECT * FROM scores WHERE userId = "${user.id}"`).then(row => {
        if (!row) { return message.reply("You haven't signed up yet! D: Use `m~daily` (Using default prefix) to earn your first amount of credits."); } 

        var Time = (((Date.now() - row.daily) / 86400000)).toFixed(3);
        var time = (((Date.now() - row.repDaily) / 86400000)).toFixed(3);

        const embed = new client.methods.Embed()
            .setTimestamp()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setThumbnail(user.avatarURL())
            .setColor("#4d5fd")
            .addField("User:", `${user.username} (${user.id})`)
            .addField("Credits:", (row.credits).toLocaleString(), true);
            if (Time >= 14) { embed.addField("Last Daily:", `${Time / 7} weeks ago`, true); }
            else if (Time >= 1) { embed.addField("Last Daily:", `${Time} days ago`, true); }
            else { embed.addField("Last Daily:", `${(Time * 24).toFixed(3)} hours ago`, true); }
            embed.addField("Reputation:", row.rep, true);
            if (time >= 14) { embed.addField("Last rep given:", `${(time / 7).toFixed(3)} weeks ago`, true); }
            else if (time >= 1) { embed.addField("Last rep given:", `${time} days ago`, true); }
            else { embed.addField("Last rep given:", `${(time * 24).toFixed(3)} hours ago`, true); }
        
        message.channel.send({embed});
    }).catch(error => { 
        console.log(error);
        return message.reply("Error in command. Please try again later.");
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["bal", "credits", "profile"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
  
exports.help = {
    name: "balance",
    description: "Check credit amount and the last time the user recieved their daily.",
    usage: "[member:str]",
    usageDelim: "",
};