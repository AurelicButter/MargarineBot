const { existsSync } = require("fs");

/**
 * Picks a random speech line to simulate speech.
 * @param {KlasaMessage} msg - Required.
 * @param {Object[]} keys - Required. Value 0 is the command or function name for searching and Value 1 is the context.
 * @param {Object[]} [replace] - Can be null. Any value to replace in the text. Denoted as a tuple [replace, new] for each item
 * @returns {string} Randomly selected speech line.
 */
module.exports = function speech(msg, keys, replace=[]) {
    if (!keys) { throw new Error("Keys missing in function call!"); }

    var name = keys[0];
    if (name.startsWith("func-")) { var category = name.slice(5); }
    else {
        var category = msg.client.commands.get(name).fullCategory;
        category = category[category.length - 1].toLowerCase();
    }

    var baseLocation = `${msg.client.userBaseDirectory}/assets/speech/`;
    var speechLocation = existsSync(baseLocation + msg.guild.settings.langSpeech) ? `${baseLocation}${msg.guild.settings.langSpeech}` : `${baseLocation}${msg.client.gateways.guilds.schema.get("langSpeech").default}`;

    var PATH = `${speechLocation}/${category}.js`;

    if (!existsSync(baseLocation + msg.guild.settings.langSpeech)) {
        msg.channel.send("Whoops! Your langSpeech settings on here don't exist in my records. I've defaulted to the default as a backup.");

        console.error(`Localization file is missing. Defaulted to the original language.\nLanguage: ${msg.guild.settings.langSpeech}\nCategory: ${category}\nCommand: ${name}\n${PATH}\n\n`);
    }

    var t = require(PATH); var n;
    if (!name.startsWith("func-")) { t = t[name]; n = 1; }
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