/* Base command is from the default Komada help command. This has been modified a bit */
const local = require("../../assets/localization.json")["permLevels"]["general"];

exports.run = async (client, msg, [cmd, mod]) => {
    const method = client.user.bot ? "author" : "channel";
    const help = this.buildHelp(client, msg);
    const categories = Object.keys(help);
    const helpMessage = [];
    const prefix = msg.guildSettings.prefix || client.config.prefix;

    if (cmd === undefined) {
        for (let cat = 0; cat < categories.length; cat++) { helpMessage.push(`- ${categories[cat]}`); }
        
        const embed = new client.methods.Embed()
            .setColor(0x04d5fd)
            .setTitle(`${client.user.username}'s Command Categories`)
            .setDescription("*Do " + `\`${prefix}help module <module name>\`` + " for category commands.*")
            .addField("Categories:", helpMessage);
        return msg.send({embed});
    } if (cmd) {
        if (cmd === "category" || cmd === "module") {
            if (!mod) { return msg.send("You did not supply me with a category!"); }
    
            for (let cat = 0; cat < categories.length; cat++) {
                if (categories[cat].toLowerCase() === mod.toLowerCase()) {
                    helpMessage.push(`**${categories[cat]} Commands**: \`\`\`asciidoc`);
                    const subCategories = Object.keys(help[categories[cat]]);
                    for (let subCat = 0; subCat < subCategories.length; subCat++) {
                        helpMessage.push(`= ${subCategories[subCat]} =`, `${help[categories[cat]][subCategories[subCat]].join("\n")}\n`);
                    }
                    helpMessage.push("```");
    
                    msg.send(helpMessage, { split: { char: "\u200b" } }); break;
                }
                if (Number(cat) + 1 === categories.length) { msg.send("The category you were looking for does not exist."); break; }
            }
        } else {
            cmd = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
            if (!cmd) { return msg.send("❌ | Unknown command, please run the help command with no arguments to get a list of categories."); }
    
            if (!this.runCommandInhibitors(client, msg, cmd)) { return; }

            var usage = cmd.help.humanUse ? [cmd.help.humanUse, "_"] : [cmd.help.usage, " "];
            var usageAct = usage.length < 1 ? "": usage[0].split(usage[1]).join(cmd.help.usageDelim);
            var alias = cmd.conf.aliases.length > 0 ? ` aka: (${cmd.conf.aliases.join(", ")})`: "";
            
            const embed = new client.methods.Embed()
                .setColor(0x04d5fd)
                .setTitle(cmd.help.name + alias)
                .setDescription(cmd.help.description)
                .addField("Usage:", `\`${prefix + cmd.help.name + " " + usageAct}\``)
                .addField("Permission level:", local[cmd.conf.permLevel]);
            if (cmd.help.extendedHelp) { embed.addField("Extended Help:", cmd.help.extendedHelp); }
            msg.send({embed});
        }
    }
};
  
exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: ["commands"],
    permLevel: 0,
    botPerms: ["SEND_MESSAGES"]
};
  
exports.help = {
    name: "help",
    description: "Display help for a command.",
    usage: "[command:str] [mod:str]",
    usageDelim: " ",
    humanUse: "(command|module)_ ([If module] command)"
};
  
/* eslint-disable no-restricted-syntax, no-prototype-builtins */
exports.buildHelp = (client, msg) => {
    const help = {};
    const prefix = msg.guildSettings.prefix || client.config.prefix;
  
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
  
    for (const command of client.commands.values()) {
      if (this.runCommandInhibitors(client, msg, command)) {
        const cat = command.help.category;
        const subcat = command.help.subCategory;
        if (!help.hasOwnProperty(cat)) { help[cat] = {}; }
        if (!help[cat].hasOwnProperty(subcat)) { help[cat][subcat] = []; }
        help[cat][subcat].push(`\u00A0${prefix}${command.help.name.padEnd(longest)} :: ${command.help.description}`);
      }
    }
  
    return help;
};
  
exports.runCommandInhibitors = (client, msg, command) => !client.commandInhibitors.some((inhibitor) => {
    if (!inhibitor.conf.spamProtection && inhibitor.conf.enabled) { return inhibitor.run(client, msg, command); }
    return false;
});