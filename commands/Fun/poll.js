exports.run = async (client, message, [question, ...option]) => {
    if(!question) { return message.reply("You need to provide a question."); }
    else if(option.length < 2) { return message.reply("You need to provide at least two options!"); }
    else if (option.length > 25) { return message.reply("Whoa! You have a giant list of options! Not even I can handle all of these!"); }

    var emote = ["✅", "❎", "☑", "✔", "❌", "✖", "⭕", "🔘"];

    message.delete().catch();
    const embed = new client.methods.Embed()
        .setColor("#FFFFFF")
        .setTimestamp()
        .setDescription(`A poll has been started by ${message.author.username}!`)
        .addField("Question: ", `${question}`);

    for (var x = 0; x < option.length; x++) { embed.addField(`Option ${x + 1} - ${emote[x]}:`, option[x]); }

    const msg = await message.channel.send({embed});
    for (var x = 0; x < option.length; x++) { msg.react(emote[x]); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
};
  
exports.help = {
    name: "poll",
    description: "Poll users",
    usage: "[question:str] [option:str][...]",
    usageDelim: " | ",
    humanUse: "(question)_(option1)_(option2)_(etc...->option5)"
};