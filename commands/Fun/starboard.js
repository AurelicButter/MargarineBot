const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "starboard",
            enabled: true,
            subcommands: true,
            runIn: ["text"],
            permissionLevel: 5,
            requiredPermissions: ["EMBED_LINKS"],
            description: "Manage a starboard within your guild!",
            usage: "<set|remove|show> [channel|emote|amount] [item:string]", usageDelim: " ",
            extendedHelp: "Note: Only custom emotes can be set for the starboard currently. If there is no channel set, starboard will not be enabled."
        });
    }

    show(msg) {
        var sbChannel = msg.guild.settings.starboard.channel || "No channel set";
        var sbEmote = msg.guild.settings.starboard.emote;
        var sbTotal = msg.guild.settings.starboard.requiredAmount;

        msg.channel.send(this.client.speech(msg, ["starboard", "list"], 
            [["-channel", sbChannel], ["-emote", sbEmote], ["-amount", sbTotal]]
        ));
    }

    async remove(msg, [target]) {
        if (!target) { return msg.channel.send(this.client.speech(msg, ["starboard", "noItem"])); }
        
        if (target === "emote") { 
            msg.guild.settings.update("starboard.emote", "⭐"); 
        } else if (target === "amount") { 
            msg.guild.settings.update("starboard.requiredAmount", 5); 
        } else { 
            msg.guild.settings.update("starboard.channel", null); 
        }

        msg.channel.send(this.client.speech(msg, ["starboard", "remove"], [["-target", target]]));
    }

    async set(msg, [target, item]) {
        var starboardEdit;
        if (!item) { return msg.channel.send(this.client.speech(msg, ["starboard", "noItem"])); }

        if (target === "channel") {
            if (!item.includes("<#")) { return msg.channel.send(this.client.speech(msg, ["starboard", "wrongItem"])); }
            starboardEdit = "starboard.channel";
        } else if (target === "emote") {
            if (!RegExp('<:\\S*:\\d*>').test(item)) { return msg.channel.send(this.client.speech(msg, ["starboard", "wrongItem"])); }
            starboardEdit = "starboard.emote";
        } else if (target === "amount") {
            if (isNaN(item)) { return msg.channel.send(this.client.speech(msg, ["starboard", "wrongItem"])); }
            starboardEdit = "starboard.requiredAmount";
        } else { return msg.channel.send(this.client.speech(msg, ["starboard", "wrongItem"])); }

        msg.guild.settings.update(starboardEdit, item);
        msg.channel.send(this.client.speech(msg, ["starboard", "set"], [["-target", target], ["-item", item]]));
    }
};