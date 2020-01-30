const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "report",
            enabled: true,
            runIn: ["text"],
            requiredPermissions: ["EMBED_LINKS"],
            description: "File a report to the bot owner. (ie: Bug, issue, complaint)",
            extendedHelp: "Margarine will be sliding into your DMs for a few questions. Be sure to have DMs open and ready to answer some questions!"
        });
    }

    async run(msg) {    
        const reportTypes = {
            issue: ["Issue", 0xFF0000],
            bug: ["Bug", 0xFFFF00],
            suggestion: ["Suggestion", 0xFFA500],
            complaint: ["Complaint", 0xDB3E17],
            todo: ["Todo", 0x04d5fd]
        };

        const filter = m => Object.keys(reportTypes).includes(m.content.toLowerCase());

        await msg.reply(this.client.speech(msg, ["report", "start"]));
        await msg.author.send(this.client.speech(msg, ["report", "q1"])).then(() => {
            msg.author.dmChannel.awaitMessages(filter, { max: 1, time: 160000, errors: ["time"], }).then((collected) => {
                var type = collected.first().content.toLowerCase();
                if (type === "todo" && msg.author.id !== this.client.owner.id) { return msg.author.send(this.client.speech(msg, ["report", "err1"])); }

                type = reportTypes[type];
                msg.author.send(this.client.speech(msg, ["report", "q2"])).then(() => {
                    msg.author.dmChannel.awaitMessages(m => m.content, { max: 1, time: 130000, errors: ["time"], }).then((desc) => {
                        var reportNumber = this.client.dataManager("select", "report", "stats").count + 1;

                        const embed = new MessageEmbed()
                            .setTimestamp()
                            .setColor(type[1])
                            .setTitle(`${type[0]} Report: ${reportNumber}`)
                            .setDescription(desc.first().content)
                            .setFooter(`Reported by: ${msg.author.tag} from ${msg.channel.guild.name}`, msg.author.displayAvatarURL());

                        const DMembed = new MessageEmbed()
                            .setColor(0x00AE86)
                            .setTimestamp()
                            .setDescription(`**Report number:** ${reportNumber} \n**Issue:** ${desc.first().content} 
                            \nYour report has been sent! Any more questions, please ask ${this.client.owner.tag}!`);

                        this.client.channels.get(this.client.ownerSetting.get("channels").report).send(embed);
                        msg.author.send({embed: DMembed});  
                        this.client.dataManager("update", [`count=${reportNumber}`, "report"], "stats");
                    }).catch(() => { msg.author.send(this.client.speech(msg, ["report", "timeout", "t2"])); }); 
                });
            }).catch(() => { msg.author.send(this.client.speech(msg, ["report", "timeout", "t1"])); }); 
        });
    }
};