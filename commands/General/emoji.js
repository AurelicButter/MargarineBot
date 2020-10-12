const { Command } = require("klasa");

function errMsg(msg, type) {
    msg.channel.send(msg.client.speech(msg, ["emoji", type])).then(msg => { 
        if (msg.channel.permissionsFor(msg.client.user).has("MANAGE_MESSAGES")) { 
            setTimeout(() => { msg.delete(); }, 4000);
        } 
    }); 
}

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "emoji",
            enabled: true,
            runIn: ["text"],
            aliases: ["emote", "see", "react"],
            requiredPermissions: ["ATTACH_FILES", "ADD_REACTIONS"],
            description: "Use your pool of emotes from other servers!",
            usage: "[react|Name:str] [messageID:str]", usageDelim: " ",
            extendedHelp: "Either use the big image or use the alias of react and add a message ID to react to a message instead!"
        });

        this.humanUse = "[react|(emote name)] [(messageID if using react)]";
    }

    async run(msg, [Name, ID]) {
        const prefix = msg.guild.settings.prefix;

        if (msg.channel.permissionsFor(this.client.user).has("MANAGE_MESSAGES")) { msg.delete(); }
        if (!Name) { return errMsg(msg, "noName"); }
        if (msg.content.slice(prefix.length).startsWith("react") && (!ID)) { return errMsg(msg, "noID"); }
        if (Name.startsWith("<")) { Name = Name.slice(2, -20); }

        let emoji = Array.from(this.client.emojis.cache).filter((element) => {
            if (element[1].name === Name) { return element; }
        });

        try { var type = emoji[0][1].animated === true ? "gif" : "png"; } 
        catch(err) { return errMsg(msg, "badName"); }

        if (msg.content.slice(prefix.length).startsWith("react")) {
            msg.channel.messages.fetch(ID).then(msg => msg.react(this.client.emojis.cache.get(emoji[0][0]))); 
        } else { msg.channel.send({files: [`https://cdn.discordapp.com/emojis/${emoji[0][0]}.${type}`]}); }
    }
};