let games = require("../assets/localization.json")["games"];

module.exports = (client, name, type, status) => {
    if (status === null) { status = "online"; }
    if (type === null) { type = 0; } //A.K.A => play

    if (name === "-start" || name === "-reset") {
        Presence(client, "play", "Playing around with " + client.owner.username, "online");
        client.timer = setInterval(function() {
            do { //No duplicate statuses, Margarine. K thx.
                var items = games[Math.floor(Math.random() * games.length)];
            } while (client.user.presence.activity.name !== null && items[0] === client.user.presence.activity.name.slice(9));

            Presence(client, items[1], items[0], status);
        }, 900000);
    } else { 
        Presence(client, type, name, status);
        clearInterval(client.timer); 
    }
};

function Presence(client, type, name, status) {
    const tList = { "play": "PLAYING", "stream": "STREAMING", "listen": "LISTENING", "watch": "WATCHING" };
    type = tList[type];
    name = (name !== "-null") ? client.ownerSetting.get("globalPrefix") + "help | " + name : null;

    client.user.setPresence({ activity: { name, type }, status });
}

module.exports.help = {
    name: "presenceHelper",
    description: "Sets and manages the bot's presence"
}