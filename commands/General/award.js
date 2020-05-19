const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "award",
            enabled: true,
            runIn: ["text"],
            requiredPermissions: ["EMBED_LINKS"],
            description: "Information on the awards given out."
        });
    }

    async run(msg) {
        var statData = this.client.dataManager("select", "Overall", "awards");
        var awardAmt = this.client.settings.get("awards");

        var sum = statData.suggest + statData.bug + statData.minor + statData.major;
        var rewarded = (statData.suggest * awardAmt.suggest) + (statData.bug * awardAmt.bug) + (statData.minor * awardAmt.minor) + (statData.major * awardAmt.major);

        const embed = new MessageEmbed()
            .setColor(0x04d5fd)
            .setTimestamp()
            .setTitle(`${this.client.user.username}'s Award System`)
            .setDescription(`${sum} awards given with ${rewarded} credits awarded!`)
            .setFooter(msg.guild.name, msg.guild.iconURL())
            .addField("Description:", "For those who have a profile with Margarine, users can earn more credits by submitting suggestions, bugs, and issues via the report command. Upon completion, the user is awarded an amount of credits.")
            .addField(`Suggestions (${awardAmt.suggest}):`, statData.suggest, true)
            .addField(`Bugs (${awardAmt.bug}):`, statData.bug, true)
            .addField(`Minor Issues (${awardAmt.minor}):`, statData.minor, true)
            .addField(`Major Issues (${awardAmt.major}):`, statData.major, true);
            
        msg.channel.send({embed});
    }
};