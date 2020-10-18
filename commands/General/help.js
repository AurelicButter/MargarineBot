const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

/* This is a modified command based off of the default Klasa help command. */
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

        this.humanUse = "[module|(command name)] [(module name if using module)]";
    }

    async run(msg, [cmd, mod]) {
        const help = await this.buildHelp(msg);

        const categories = Object.keys(help);
        const helpMessage = [];
        let embed;

        switch (cmd) {
            case undefined:
                for (let cat = 0; cat < categories.length; cat++) { helpMessage.push(`- ${this.client.util.toTitleCase(categories[cat])}`); }
        
                embed = new MessageEmbed()
                    .setColor(0x04d5fd)
                    .setTitle(`${this.client.user.username}'s Command Categories`)
                    .setDescription("*Do " + `\`${msg.guild.settings.prefix}help module <module name>\`` + " for category commands.*")
                    .addField("Categories:", helpMessage);
            
                msg.send({embed});
                break;
            case "module":
                if (!mod) { return msg.sendLocale("HELP_NOSUPPLIEDCAT"); }

                // Determine the matching category. If no category, return with error.
                var cat = categories.filter(category => category.toLowerCase() === mod.toLowerCase());
                if (cat.length === 0) { return msg.sendLocale("HELP_NOCATEGORY"); }

                // Pull index of category for further help building.
                cat = categories.indexOf(cat[0]);
    
                helpMessage.push(`**${this.client.util.toTitleCase(categories[cat])} Commands**: \`\`\`asciidoc`);
                const subCategories = Object.keys(help[categories[cat]]);

                for (let subCat = 0; subCat < subCategories.length; subCat++) {
                    helpMessage.push(`= ${this.client.util.toTitleCase(subCategories[subCat])} =`, `${help[categories[cat]][subCategories[subCat]].join("\n")}\n`);
                }

                helpMessage.push("```");
    
                msg.send(helpMessage, { split: { char: "\u200b" } }); 
                break;
            default:
                cmd = this.client.commands.get(cmd) || this.client.commands.aliases.get(cmd);
                if (!cmd) { return msg.sendLocale("HELP_NOCMD"); }

                var usage = cmd.humanUse ? [cmd.humanUse.trim(), "_"] : [cmd.usageString, " "];
                var usageAct = usage.length < 1 ? "": usage[0].split(usage[1]).join(cmd.usageDelim);
                var alias = cmd.aliases.length > 0 ? ` aka: (${cmd.aliases.join(", ")})`: "";

                embed = new MessageEmbed()
                    .setColor(0x04d5fd)
                    .setTitle(cmd.name + alias)
                    .setDescription(cmd.description)
                    .addField("Usage:", `\`${msg.guild.settings.prefix + cmd.name} ${usageAct}\``)
                    .addField("Permission level:", msg.language.get("PERMLEVEL")[cmd.permissionLevel]);
                    if (typeof cmd.extendedHelp === "string") { embed.addField("Extended Help:", cmd.extendedHelp); }
                    msg.send({embed});
                break;
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
					const description = typeof command.description === "function" ? command.description(message.language) : command.description;
					help[command.category][command.subCategory].push(`${prefix}${command.name.padEnd(longest)} :: ${description}`);
				})
				.catch(() => {
					// noop
				})
		));

		return help;
	}
};