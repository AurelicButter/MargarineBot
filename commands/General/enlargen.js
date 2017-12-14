exports.run = async (client, message, [Name, type, ID]) => {
    let array = message.content.slice(message.guild.settings.prefix.length).split(" ");
    
    if (array[0] === "react") {
        var type = array[0];
        var Name = array[1];
        var ID = array[2];
    }

    if (!Name) { return message.channel.send("You need to give me an emoji!"); }
    message.delete();
    let emote = client.emojis.find("name", Name);
    if (!emote) { return message.channel.send("I can't find that emoji. My searching capabilities are case-sensitive so be sure that the emoji Name is **exactly** the way it is spelled."); }
    
    if (type === "react") { 
		if (!ID) { return message.channel.send("You need to specify a message's ID so that I can find it!") }
		message.channel.messages.fetch(ID).then(msg => msg.react(emote)); 
	} else { return message.channel.send("", { files: [`https://cdn.discordapp.com/emojis/${emote.id}.png`]}); }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["see", "emoji", "emote", "react"],
    permLevel: 0,
    botPerms: ["ATTACH_FILES", "ADD_REACTIONS", "MANAGE_MESSAGES"],
};
  
exports.help = {
    name: "enlargen",
    description: "Displays an enlargened emoji.",
    usage: "[Name:str] [react] [messageID:str]",
    usageDelim: " ",
    extendedHelp: "Users using `react` do not have to specify react as that is already defined with the alias. Users using any other alias or name must specify react if they wish for a reaction.",
};