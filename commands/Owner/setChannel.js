const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "setchannel",
            enabled: true,
            runIn: ["text", "dm"],
            permissionLevel: 10,
            description: "Set the award or report channels.",
            usage: "<award|report> <channel:channel>", usageDelim: " "
        });

        this.humanUse = "<award|report> <target channel>";
    }

    async run(msg, [type, channel]) {
        var channelType;

        if (type === "award") { channelType = "awardChannel"; }
        else { channelType = "reportChannel"; }

        this.client.settings.update(channelType, channel);
        msg.sendLocale("CHANNEL_UPDATE", [channelType, channel.name]);
    }
};