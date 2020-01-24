const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "poll",
            runIn: ["text"],
            description: "Poll users",
            usage: "[question:str] [option:str][...]", usageDelim: ",",
            extendedHelp: "Poll between 2 and 8 different options at a time! If more options are needed, consider shrinking the list."
        });
    }

    async run(msg, [question, ...option]) {
        var emote = ["✅", "❎", "☑", "✔", "❌", "✖", "⭕", "🔘"];

        if (!question) { return msg.channel.send(this.client.speech(msg, ["poll", "noQuestion"])); }
        else if (option.length < 2) { return msg.channel.send(this.client.speech(msg, ["poll", "noChoice"])); }
        else if (option.length > emote.length) { return msg.channel.send(this.client.speech(msg, ["poll", "maxChoice"])); }    
        
        msg.delete().catch();
        const embed = new MessageEmbed()
            .setColor("#FFFFFF")
            .setTimestamp()
            .setDescription(`A poll has been started by ${msg.author.username}!`)
            .addField("Question: ", `${question}`);
    
        for (var x = 0; x < option.length; x++) { embed.addField(`Option ${x + 1} - ${emote[x]}:`, option[x]); }
    
        const message = await msg.channel.send({embed});
        for (var x = 0; x < option.length; x++) { message.react(emote[x]); }
    }
};