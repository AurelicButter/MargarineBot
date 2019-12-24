const { Client } = require("klasa");
const Discord = require("discord.js");
const config = require("./assets/settings.json");
const util = require("./utilities/utilExport.js");

util.envCheck(); //Checks to make sure Margarine is running in the right environment.

const client = new Client({
    fetchAllMembers: false,
    prefix: config.prefix,
    commandEditing: true
});

Client.defaultPermissionLevels
    .add(5, ({ guild, member }) => guild && member.roles.has(guild.settings.modRole))
    .add(6, ({ guild, member }) => guild && member.permissions.has('ADMINISTRATOR'))
    .add(9, ({ author, client }) => author === client.owner || author.id === config.secondary)
    .add(10, ({ author, client }) => author === client.owner);

client.gateways.guilds.schema
    .add("modRole", "role")
    .add("langSpeech", "language", { default: "en-CA" });

client.speech = util.speech;
client.dataManager = util.dataManager;

client.ownerSetting = new Discord.Collection();

var keys = Object.keys(config);
for (var x = 0; keys.length > x; x++) { 
    switch (keys[x]) {
        case "owner":
            var key = Object.keys(config.owner);
            for (var y = 0; key.length > y; y++) { client.ownerSetting.set(key[y], config.owner[key[y]]); } break;
        case "build": client.ownerSetting.set("build", config.build); break;
    }
}

client.ownerSetting.set("permLevel", config.permLevels);

client.database = {
    "items": require("./assets/values/items.json"),
    "recipes": require("./assets/values/recipes.json")
};

client.login(config.token).then(() => {
    client.user.setPresence({ activity: { name: "m~help | Running the latest code!", type: "PLAYING" }, status: "online" });
});