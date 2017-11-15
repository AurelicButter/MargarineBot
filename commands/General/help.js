exports.run = async (client, msg, [cmd]) => {
    const method = client.user.bot ? "author" : "channel";
    const help = this.buildHelp(client, msg);
    const categories = Object.keys(help);
    const helpMessage = [];
    const prefix = msg.guildSettings.prefix || client.config.prefix;

    if (cmd === undefined) {
        for (let cat = 0; cat < categories.length; cat++) { helpMessage.push(`- ${categories[cat]}`); }
        
        const embed = new client.methods.Embed()
            .setColor("#4d5fd")
            .setTitle(`${client.user.username}'s Command Categories`)
            .setDescription("*Do " + `\`${prefix}help module <module name>\`` + " for category commands.*")
            .addField("Categories:", helpMessage);
        return msg.send({embed});
    } if (cmd) {
        cmd = msg.content.slice(prefix.length + 5).split(" ");
        Array.from(cmd);

        if (cmd[2]) { return msg.send("You have provided too many words. All categories are one word. Why do you give me two?"); }

        if (cmd[0] === "categories" || cmd[0] === "modules" || cmd[0] === "category" || cmd[0] === "module") {
            if (!cmd[1]) { return msg.send("You did not supply me with a category!"); }
    
            for (let cat = 0; cat < categories.length; cat++) {
                if (categories[cat].toLowerCase() === cmd[1].toLowerCase()) {
                    helpMessage.push(`**${categories[cat]} Commands**: \`\`\`asciidoc`);
                    const subCategories = Object.keys(help[categories[cat]]);
                    for (let subCat = 0; subCat < subCategories.length; subCat++) {
                        helpMessage.push(`= ${subCategories[subCat]} =`, `${help[categories[cat]][subCategories[subCat]].join("\n")}\n`);
                    }
                    helpMessage.push("```");
    
                    msg.send(helpMessage, { split: { char: "\u200b" } }); break;
                }
                if (Number(cat) + 1 === Number(categories.length)) { msg.send("The category you were looking for does not exist."); break; }
            }
        } else {
            cmd = client.commands.get(cmd[0]) || client.commands.get(client.aliases.get(cmd[0]));
            if (!cmd) { return msg.send("❌ | Unknown command, please run the help command with no arguments to get a list of categories."); }
    
            if (!this.runCommandInhibitors(client, msg, cmd)) { return; } // eslint-disable-line
            
            if (cmd.conf.permLevel === 0) { var permissionLevel = "Level 0: Everyone"; }
            if (cmd.conf.permLevel === 2) { var permissionLevel = "Level 2: Guild Moderators"; }
            if (cmd.conf.permLevel === 3) { var permissionLevel = "Level 3: Guild Admins"; }
            if (cmd.conf.permLevel === 4) { var permissionLevel = "Level 4: Guild Owners"; }
            if (cmd.conf.permLevel === 6) { var permissionLevel = "Level 6: Support Team"; }
            if (cmd.conf.permLevel === 8) { var permissionLevel = "Level 8: Developer Team"; }
            if (cmd.conf.permLevel === 9) { var permissionLevel = "Level 9: Toast & Butter"; }
            if (cmd.conf.permLevel === 10) { var permissionLevel = "Level 10: Bot Owner"; }

            const embed = new client.methods.Embed()
                .setColor("#4d5fd")
                .setTitle(cmd.help.name)
                .setDescription(cmd.help.description)
                .addField("Usage:", `\`${cmd.usage.fullUsage(msg)}\``)
                .addField("Permission level:", permissionLevel)
                .addField("Extended Help:", cmd.help.extendedHelp || "No extended help is available");
            return msg.send({embed});
        }
    }
};
  
exports.conf = {
    enabled: true,
    runIn: ["text", "dm"],
    aliases: ["commands"],
    permLevel: 0,
    botPerms: ["SEND_MESSAGES"],
    requiredFuncs: [],
    requiredSettings: [],
};
  
exports.help = {
    name: "help",
    description: "Display help for a command.",
    usage: "[command:str]",
    usageDelim: "",
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