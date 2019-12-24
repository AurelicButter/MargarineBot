const fs = require("fs");

module.exports = function(msg, keys, replace=[]) {
    if (!keys) { throw new Error("Keys missing in function call!"); }

    var name = keys[0];
    if (name.startsWith("func-")) { var category = name.slice(5); }
    else {
        var category = msg.client.commands.get(name).fullCategory;
        category = category[category.length - 1].toLowerCase();
    }

    var PATH = msg.client.userBaseDirectory + "/assets/speech/" + msg.guild.settings.langSpeech + "/" + category + ".js";

    if (fs.existsSync(PATH) === false) { 
        throw new Error("Localization file is missing.\nLanguage: " + msg.guild.settings.langSpeech + "\nCategory: " + category + "\nCommand: " + name + "\n" + PATH);
    }

    var t = require(PATH); var n;
    if (name.startsWith("func-") === false) { t = t[name]; n = 1; }
    else { t = t[keys[1]]; n = 2; }
    for (var x = n; x < keys.length; x++) { t = t[keys[x]]; }
    var text = t[Math.floor(Math.random() * t.length)];

    if (replace.length > 0) {
        for (var x = 0; x < replace.length; x++) {
            text = text.replace(replace[x][0], replace[x][1]);
        }
    }

    return text.replace("-prefix", msg.guild.settings.prefix);
};

module.exports.help = {
    name: "speechHelper",
    description: "Picks a random speech line and sends it to the channel."
};