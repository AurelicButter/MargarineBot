const { Client } = require("klasa");
const { Collection } = require("discord.js");
const config = require("./assets/settings.json");
const { envCheck, speech, dataManager, util, commandRemover, schemaManager } = require("./utilities/utilExport.js");
const { existsSync } = require("fs");

envCheck(); //Checks to make sure Margarine is running in the right enviroment.

const client = new Client({
    fetchAllMembers: false,
    prefix: config.prefix,
    language: "en-CA",
    commandEditing: true,
    readyMessage: (client) => `This is ${client.user.username} speaking! Online and awaiting orders!\nI'm currently serving ${client.guilds.cache.size} guilds and ${client.users.cache.size} people!`
});

Client.defaultPermissionLevels
    .add(5, ({ guild, member }) => guild && member.roles.cache.has(guild.settings.modRole))
    .add(6, ({ guild, member }) => guild && member.permissions.has("ADMINISTRATOR"))
    .add(7, ({ guild, member }) => guild && guild.ownerID === member.id)
    .add(9, ({ author, client }) => author === client.owner || author.id === config.secondary)
    .add(10, ({ author, client }) => author === client.owner);

schemaManager(client); //Adds all configurable settings.

client.speech = speech;
client.dataManager = dataManager;
client.util = util; //All utility functions and extra search functions

if (!existsSync(config.database)) { dataManager("init"); } //Init the SQLite Database

client.ownerSetting = new Collection();
client.music = new Collection();

var keys = Object.keys(config);
for (var x = 0; keys.length > x; x++) { 
    switch (keys[x]) {
        case "owner":
            var key = Object.keys(config.owner);
            for (var y = 0; key.length > y; y++) { client.ownerSetting.set(key[y], config.owner[key[y]]); } break;
        case "build": client.ownerSetting.set("build", config.build); break;
    }
}

client.ownerSetting.set("globalPrefix", config.prefix);

client.itemData = require("./assets/items.json");

commandRemover(client);

client.login(config.token);