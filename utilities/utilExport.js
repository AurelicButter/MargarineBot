/* Exports all needed utilities for the client. */

exports.speech = require("./speechHelper.js");
exports.envCheck = require("./envCheck.js");
exports.dataManager = require("./dataManager.js");

exports.util = {
    defaultChannel: require("./defaultChannel.js"),
    timekeeper: require("./timekeeper.js"),
    presenceHelper: require("./presenceHelper.js"),
    /** 
     * Returns a capitialized text string
     * @param { String } text 
     * @return { String }
     */
    toTitleCase: function(text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    }
};