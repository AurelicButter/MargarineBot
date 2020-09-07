const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "eval",
            runIn: ["text", "dm"],
            aliases: ["js"],
            guarded: true,
            description: "General information",
            permissionLevel: 10
        });
        this.args = ...args;
    }

    async run(msg) {
        let output = "";
        let input = args.join(" ");
        try {
           output += JSON.stringify(eval(input), null, 2);
        } catch (e) {
           output += JSON.stringify(e, null, 2);
        }
        let embed = new MessageEmbed().setTitle('Eval').addField(output, "Input: "+input);
        msg.channel.send(embed);
    }
};
