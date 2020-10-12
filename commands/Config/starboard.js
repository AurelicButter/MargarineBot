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

        this.humanUse = "<set|remove|show (default)> [channel|emote|amount] [item]";
    }

    show(msg) {
        var sbChannel = msg.guild.settings.starboard.channel || msg.language.get("NOCHANNEL");
        var sbEmote = msg.guild.settings.starboard.emote;
        var sbTotal = msg.guild.settings.starboard.requiredAmount;

        msg.sendLocale("STARBOARD_SHOW", [msg, sbChannel, sbEmote, sbTotal]);
    }

    async remove(msg, [target]) {
        if (!target) { return msg.sendLocale("STARBOARD_NOITEM", [msg]); }

        switch (target) {
            case "emote":
                msg.guild.settings.update("starboard.emote", "⭐"); 
                break;
            case "amount":
                msg.guild.settings.update("starboard.requiredAmount", 5);
                break;
            default:
                msg.guild.settings.update("starboard.channel", null); 
                break;
        }

        msg.sendLocale("STARBOARD_REMOVE", [msg, target]);
    }

    async set(msg, [target, item]) {
        var starboardEdit;
        if (!item) { return msg.sendLocale("STARBOARD_NOITEM", [msg]); }

        // Validate and set the starboardEdit variable if valid.
        switch (target) {
            case "channel":
                if (!item.includes("<#")) { return msg.sendLocale("STARBOARD_WRONGITEM", [msg]); }
                starboardEdit = "starboard.channel";
                break;
            case "emote":
                if (!RegExp("<:\\S*:\\d*>").test(item)) { return msg.sendLocale("STARBOARD_WRONGITEM", [msg]); }
                starboardEdit = "starboard.emote";
                break;
            case "amount":
                if (isNaN(item)) { return msg.sendLocale("STARBOARD_WRONGITEM", [msg]); }
                starboardEdit = "starboard.requiredAmount";
                break;
            default:
                return msg.sendLocale("STARBOARD_WRONGITEM", [msg]);
        }

        msg.guild.settings.update(starboardEdit, item);
        msg.sendLocale("STARBOARD_SETITEM", [msg, target, item]);
    }
};