const Discord = require('discord.js');
const config = require('./settings.json');
const client = new Discord.Client();
require('./util/eventLoader')(client);

//Bot Failure Safety net
client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));

client.login(config.token); //See settings.json for edits.
