const { existsSync } = require("fs");
const baseSpeechDir = `${process.cwd()}/assets/speech/`;

/**
 * Reload a speech module to have the most current changes.
 * @param {String} PATH - Target file location to reload.
 * @returns New cached require of the target location
 */
function recacheSpeech(PATH) {
    delete require.cache[require.resolve(PATH)];
    return require(PATH);
}

/**
 * Picks a random line to simulate speech.
 * @param {KlasaMessage} msg - The message that was sent.
 * @param {Object[]} keys - Value 0 is the command or function name for searching and Value 1 is the context.
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

    var speechLocation = existsSync(baseSpeechDir + msg.guild.settings.language) ? `${baseSpeechDir}${msg.guild.settings.language}` : `${baseSpeechDir}${msg.client.gateways.guilds.schema.get("language").default}`;
    var PATH = `${speechLocation}/${category}.js`;

    if (!existsSync(baseSpeechDir + msg.guild.settings.language)) {
        msg.channel.send("Whoops! Your language settings on here don't exist in my records. I've defaulted to the default as a backup.");

        console.error(`Localization file is missing. Defaulted to the original language.\nLanguage: ${msg.guild.settings.language}\nCategory: ${category}\nCommand: ${name}\n${PATH}\n\n`);
    }

    var t = recacheSpeech(PATH);
    var n;

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