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
            usage: "<set|remove|show:default> [channel|emote|amount] [item:string]", usageDelim: " ",
            extendedHelp: "Note: Only custom emotes can be set for the starboard currently. If there is no channel set, starboard will not be enabled."
        });
    }

    show(msg) {
        var sbChannel = msg.guild.settings.starboard.channel || msg.language.get("NOCHANNEL");
        var sbEmote = msg.guild.settings.starboard.emote;
        var sbTotal = msg.guild.settings.starboard.requiredAmount;

        msg.sendLocale("STARBOARD_SHOW", [msg, sbChannel, sbEmote, sbTotal]);
    }

    async remove(msg, [target]) {
        if (!target) { return msg.sendLocale("STARBOARD_NOITEM", [msg]); }
        
        if (target === "emote") { 
            msg.guild.settings.update("starboard.emote", "⭐"); 
        } else if (target === "amount") { 
            msg.guild.settings.update("starboard.requiredAmount", 5); 
        } else { 
            msg.guild.settings.update("starboard.channel", null); 
        }

        msg.sendLocale("STARBOARD_REMOVE", [msg, target]);
    }

    async set(msg, [target, item]) {
        var starboardEdit;
        if (!item) { return msg.sendLocale("STARBOARD_NOITEM", [msg]); }

        if (target === "channel") {
            if (!item.includes("<#")) { return msg.sendLocale("STARBOARD_WRONGITEM", [msg]); }
            starboardEdit = "starboard.channel";
        } else if (target === "emote") {
            if (!RegExp('<:\\S*:\\d*>').test(item)) { return msg.sendLocale("STARBOARD_WRONGITEM", [msg]); }
            starboardEdit = "starboard.emote";
        } else if (target === "amount") {
            if (isNaN(item)) { return msg.sendLocale("STARBOARD_WRONGITEM", [msg]); }
            starboardEdit = "starboard.requiredAmount";
        } else { return msg.sendLocale("STARBOARD_WRONGITEM", [msg]); }

        msg.guild.settings.update(starboardEdit, item);
        msg.sendLocale("STARBOARD_SETITEM", [msg, target, item]);
    }
};