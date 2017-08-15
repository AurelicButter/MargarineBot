const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./settings.json");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

const log = (message) => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) { console.error(err); }
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) { client.aliases.delete(alias); }
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){ reject(e); }
  });
};

client.elevation = (message) => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  let modRole = message.guild.roles.find("name", config.modrolename);
  if (modRole && message.member.roles.has(modRole.id)) { permlvl = 2; }
  let adminRole = message.guild.roles.find("name", config.adminrolename);
  if (adminRole && message.member.roles.has(adminRole.id)) { permlvl = 3; }
  let developRole = message.guild.roles.find("name", config.developrolename);
  if (developRole && message.member.roles.has(developRole.id)) { permlvl = 4; }
  if (message.author.id === config.ownerID) { permlvl = 5; }
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(e.replace(regToken, "that was redacted"));
});

client.on("error", e => {
  console.log(e.replace(regToken, "that was redacted"));
});

client.login(config.token);
