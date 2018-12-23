const fs = require("fs");

module.exports = function(msg, keys) {
    if (!keys) { throw new Error("Keys missing in function call!"); }

    var name = keys[0];
    if (name.startsWith("func-")) { var category = name.slice(5); }
    else {
        var category = msg.client.commands.get(name).help.fullCategory;
        category = category[category.length - 1].toLowerCase();
    }

    var PATH = msg.client.clientBaseDir + "\\assets\\speech\\" + msg.guildSettings.lang + "\\" + category + ".js";

    if (fs.existsSync(PATH) == false) { 
        throw new Error("Localization file is missing.\nLanguage: " + msg.guildSettings.lang + "\nCategory: " + category + "\nCommand: " + name); 
    }

    var t = require(PATH); var n;
    if (name.startsWith("func-") == false) { t = t[name]; n = 1; }
    else { t = t[keys[1]]; n = 2; }
    for (var x = n; x < keys.length; x++) { t = t[keys[x]]; }
    var text = t[Math.floor(Math.random() * t.length)]; var prefix = msg.guildSettings.prefix || msg.client.config.prefix;

    return text.replace("-prefix", prefix);
};