const { existsSync, unlinkSync } = require("fs");
const { version: djsVersion } = require("discord.js");
const { version: kVersion } = require("klasa");
/* Exports all needed utilities for the client. */

exports.speech = require("./speechHelper.js");
exports.dataManager = require("./dataManager.js");

/** Removes any unnessesscary commands in the default Klasa framework.
 * @param { KlasaClient } client
 */
exports.commandRemover = function(client) {
    const cmdNames = ["Admin/load", "Admin/unload", "Admins/transfer", "General/Chat Bot Info/info", "General/Chat Bot Info/stats"];
    for(var x = 0; x < cmdNames.length; x++) {
        if (existsSync(client.userBaseDirectory + "/node_modules/klasa/src/commands/" + cmdNames[x] + ".js")) {
            unlinkSync(client.userBaseDirectory + "/node_modules/klasa/src/commands/" + cmdNames[x] + ".js");
        }
    }
};

/**
 * Verifies the enviroment before running Margarine.
 * If the enviroment check fails, program will terminate
 * @returns { null }  If enviroment check passes.
 */
exports.envCheck = function() {    
    var missingDep = [];

    var nVersion = process.version.split("v")[1].split(".");
    nVersion = Number(`${nVersion[0]}.${nVersion[1]}`);

    if (djsVersion !== "12.0.0-dev") { missingDep.push("You are not using the right discord.js package! Required version: v12.0.0-dev"); }
    if (kVersion !== "0.5.0-dev") { missingDep.push("You are not using the right Klasa version! Required version: v0.5.0-dev"); }
    if (nVersion < 10.0) { missingDep.push("You are not using the right node.js version! Required version: v10.0.0+"); }

    if (missingDep.length > 0) { console.log(missingDep.join("\n")); process.exit(); }
};

exports.util = {
    timekeeper: require("./timekeeper.js"),
    presenceHelper: require("./presenceHelper.js"),
    modEmbed: require("./modEmbed.js"),
    /**
      * Returns the best matching channel for channel messages.
      * @param { KlasaGuild } guild - Required. Needed to search for the channel and settings.
      * @param { String } args - Defaults to "default". Takes either "default" or "mod" depending on the action needed.
      * @returns { KlasaChannel } Returns a channel that best fits the arguements given.
    */
    defaultChannel: function(guild, args="default") {
        if (guild.settings.defaultChannel !== null && args === "default") { return guild.channels.get(guild.settings.defaultChannel); }
        else if (guild.settings.modlog !== null && args === "mod") { return guild.channels.get(guild.settings.modlog); }
    
        var name = ["general", "general-chat", "off-topic"];
        var channelID = Array.from(guild.channels).filter(channel => name.includes(channel[1].name) && channel[1].type === "text");
        if (channelID.length > 0) { return channelID[0][1]; }
    
        var channels = Array.from(guild.channels.sort((e1, e2) => e1.rawPosition - e2.rawPosition));
        for (var x = 0; x < channels.length; x++) {
            var currChannel = channels[x][1];
            if (currChannel.type === "text" && currChannel.permissionsFor(guild.members.get(this.client.user.id)).has("SEND_MESSAGES")) { 
                channelID = currChannel; 
                x = channels.length;
            }
        }
    
        return guild.channels.get(channelID.id);
    },
    /** 
     * Returns a capitialized text string
     * @param { String } text 
     * @return { String }
     */
    toTitleCase: function(text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    }
};