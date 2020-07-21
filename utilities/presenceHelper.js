let games = require("../assets/localization.json")["games"];

function Presence(client, type, name, status) {
    const tList = { "play": "PLAYING", "stream": "STREAMING", "listen": "LISTENING", "watch": "WATCHING" };
    type = tList[type];
    name = (name !== "-null") ? `${client.globalPrefix}help | ${name}` : null;

    client.user.setPresence({ activity: { name, type }, status });
}

/**
 * Gets a random pre-defined status. If previous status is provide, function will
 * determine a new and different status to display.
 * @param {String} previous - The previous status of the bot.
 * @returns {String[]} The status message and determined type.
 */
function determineStatus(previous) {
    var items;
    if (previous) {
        do {
            items = games[Math.floor(Math.random() * games.length)];
        } while (items[0] === previous);
        return items;
    }

    items = games[Math.floor(Math.random() * games.length)];

    return items;
}

/**
 * Sets the presence for Margarine and starts a 15 minute interval for automatic change
 * @param { KlasaClient } client - Needed to grab the user and additional functions.
 * @param { String } name - Customize a presence. Will not reset until the user sends additional commands.
 * @param { String } [type=play] - Type of activity to be displayed. Either play, stream, listen, or watch.
 * @param { String } [status=online] - Changes the colour on the status. Either online, idle, dnd, or invisible.
 */
module.exports = (client, name, type=0, status="online") => { //Type defaulted to play and status defaulted to online.
    const sliceCheck = `${client.globalPrefix}help |`.length;
    var newStatus = null;

    if (name === "-start" || name === "-reset" || name === null) {
        newStatus = determineStatus();
        Presence(client, newStatus[1], newStatus[0], "online");
        client.timer = setInterval(function() {
            var presenceStatus = null;
            if (client.user.presence.activities[0].name !== null) {
                presenceStatus = client.user.presence.activities[0].name.slice(sliceCheck);
            }

            newStatus = determineStatus(presenceStatus);
            Presence(client, newStatus[1], newStatus[0], status);
        }, 900000);
    } else { 
        Presence(client, type, name, status);
        clearInterval(client.timer); 
    }
};