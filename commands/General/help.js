const { Command, util: { isFunction } } = require("klasa");
const { MessageEmbed } = require("discord.js");
const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

/* This is a modified command from the default Klasa commands. */
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "help",
            enabled: true,
            guarded: true,
            runIn: ["text", "dm"],
            aliases: ["commands"],
            requiredPermissions: ["SEND_MESSAGES"],
            description: "Displays help for a command",
            usage: "[module|command:str] [mod:str]", usageDelim: " "
        });
    }

    async run(msg, [cmd, mod]) {
        const help = await this.buildHelp(msg);

        const categories = Object.keys(help);
        const helpMessage = [];

        if (cmd === undefined) {
            for (let cat = 0; cat < categories.length; cat++) { helpMessage.push(`- ${this.client.util.toTitleCase(categories[cat])}`); }
        
            const embed = new MessageEmbed()
                .setColor(0x04d5fd)
                .setTitle(`${this.client.user.username}'s Command Categories`)
                .setDescription("*Do " + `\`${msg.guild.settings.prefix}help module <module name>\`` + " for category commands.*")
                .addField("Categories:", helpMessage);
            
            return msg.send({embed});
        } if (cmd === "module") {
            if (!mod) { return msg.send("You did not supply me with a category!"); }
    
            for (let cat = 0; cat < categories.length; cat++) {
                if (categories[cat].toLowerCase() === mod.toLowerCase()) {
                    helpMessage.push(`**${this.client.util.toTitleCase(categories[cat])} Commands**: \`\`\`asciidoc`);
                    const subCategories = Object.keys(help[categories[cat]]);
                    for (let subCat = 0; subCat < subCategories.length; subCat++) {
                        helpMessage.push(`= ${this.client.util.toTitleCase(subCategories[subCat])} =`, `${help[categories[cat]][subCategories[subCat]].join("\n")}\n`);
                    }
                    helpMessage.push("```");
    
                    msg.send(helpMessage, { split: { char: "\u200b" } }); break;
                }
                if (Number(cat) + 1 === categories.length) { msg.send("The category you were looking for does not exist."); break; }
            }
        } else {
            cmd = this.client.commands.get(cmd) || this.client.commands.aliases.get(cmd);
            if (!cmd) { return msg.send("❌ | Unknown command, please run the help command with no arguments to get a list of categories."); }

            var usage = cmd.humanUse ? [cmd.humanUse.trim(), "_"] : [cmd.usageString, " "];
            var usageAct = usage.length < 1 ? "": usage[0].split(usage[1]).join(cmd.usageDelim);
            var alias = cmd.aliases.length > 0 ? ` aka: (${cmd.aliases.join(", ")})`: "";

            const embed = new MessageEmbed()
                .setColor(0x04d5fd)
                .setTitle(cmd.name + alias)
                .setDescription(cmd.description)
                .addField("Usage:", `\`${msg.guild.settings.prefix + cmd.name} ${usageAct}\``)
                .addField("Permission level:", msg.language.get("PERMLEVEL")[cmd.permissionLevel]);
                if (typeof cmd.extendedHelp === "string") { embed.addField("Extended Help:", cmd.extendedHelp); }
            msg.send({embed});
        }
    }

    async buildHelp(message) {
		const help = {};

		const { prefix } = message.guildSettings;
		const commandNames = [...this.client.commands.keys()];
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

		await Promise.all(this.client.commands.map((command) =>
			this.client.inhibitors.run(message, command, true)
				.then(() => {
					if (!has(help, command.category)) { help[command.category] = {}; }
					if (!has(help[command.category], command.subCategory)) { help[command.category][command.subCategory] = []; } 
					const description = isFunction(command.description) ? command.description(message.language) : command.description;
					help[command.category][command.subCategory].push(`${prefix}${command.name.padEnd(longest)} :: ${description}`);
				})
				.catch(() => {
					// noop
				})
		));

		return help;
	}
};