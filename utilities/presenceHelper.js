let games = require("../assets/localization.json")["games"];

function Presence(client, type, name, status) {
    const tList = { "play": "PLAYING", "stream": "STREAMING", "listen": "LISTENING", "watch": "WATCHING" };
    type = tList[type];
    name = (name !== "-null") ? `${client.ownerSetting.get("globalPrefix")}help | ${name}` : null;

    client.user.setPresence({ activity: { name, type }, status });
}

/**
 * Sets the presence for Margarine and starts a 15 minute interval for automatic change
 * @param { KlasaClient } client - Required. Needed to grab the user and additional functions.
 * @param { String } name - Customize a presence. Will not reset until the user sends additional commands.
 * @param { String } type - Type of activity to be displayed. Either play, stream, listen, or watch.
 * @param { String } status - Changes the colour on the status. Either online, idle, dnd, or invisible.
 */
module.exports = (client, name, type=0, status="online") => { //Type defaulted to play and status defaulted to online.
    const sliceCheck = `${client.ownerSetting.get("globalPrefix")}help |`.length;

    if (name === "-start" || name === "-reset") {
        var items = games[Math.floor(Math.random() * games.length)]; //For random status upon startup
        Presence(client, items[1], items[0], "online");
        client.timer = setInterval(function() {
            do { //No duplicate statuses, Margarine. K thx.
                var items = games[Math.floor(Math.random() * games.length)];
            } while (client.user.presence.activities[0].name !== null && items[0] === client.user.presence.activities[0].name.slice(sliceCheck));

            Presence(client, items[1], items[0], status);
        }, 900000);
    } else { 
        Presence(client, type, name, status);
        clearInterval(client.timer); 
    }
};