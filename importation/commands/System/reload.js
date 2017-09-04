const moment = require("moment");

exports.run = async (client, msg, [type, name]) => {
  let m;
  let message;
  switch (type) {
    case "function":
      try {
        m = await msg.channel.send(`Attempting to reload function ${name}`);
        message = await client.funcs.reload.function(client, client.clientBaseDir, name);
        m.edit(`✅ ${message}`);
        await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] ${msg.author.username} has reloaded the ${type} ${name}!`);
      } catch (err) { m.edit(`❌ ${err}`); }
      break;
    case "inhibitor":
      try {
        m = await msg.channel.send(`Attempting to reload inhibitor ${name}`);
        message = await client.funcs.reload.inhibitor(client, client.clientBaseDir, name);
        m.edit(`✅ ${message}`);
        await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] ${msg.author.username} has reloaded the ${type} ${name}!`);
      } catch (err) { m.edit(`❌ ${err}`); }
      break;
    case "monitor":
      try {
        m = await msg.channel.send(`Attempting to reload monitor ${name}`);
        message = await client.funcs.reload.monitor(client, client.clientBaseDir, name);
        m.edit(`✅ ${message}`);
        await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] ${msg.author.username} has reloaded the ${type} ${name}!`);
      } catch (err) { m.edit(`❌ ${err}`); }
      break;
    case "provider":
      try {
        m = await msg.channel.send(`Attempting to reload provider ${name}`);
        message = await client.funcs.reload.provider(client, client.clientBaseDir, name);
        m.edit(`✅ ${message}`);
        await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] ${msg.author.username} has reloaded the ${type} ${name}!`);
      } catch (err) { m.edit(`❌ ${err}`); }
      break;
    case "event":
      try {
        m = await msg.channel.send(`Attempting to reload event ${name}`);
        message = await client.funcs.reload.event(client, name);
        m.edit(`✅ ${message}`);
        await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] ${msg.author.username} has reloaded the ${type} ${name}!`);
      } catch (err) { m.edit(`❌ ${err}`); }
      break;
    case "command":
      switch (name) {
        case "all":
          await require(`${client.coreBaseDir}utils/loadCommands.js`)(client);
          msg.channel.send("✅ Reloaded all commands.");
          await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] ${msg.author.username} has reloaded all commands!`);
          break;
        default:
          try {
            m = await msg.channel.send(`Attempting to reload command ${name}`);
            message = await client.funcs.reload.command(client, client.clientBaseDir, name);
            m.edit(`✅ ${message}`);
            await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] ${msg.author.username} has reloaded the command ${name}!`);
          } catch (err) { m.edit(`❌ ${err}`); }
          break;
      }
      break; // no default
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["r", "load"],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "reload",
  description: "Reloads the command file, if it's been updated or modified.",
  usage: "<function|inhibitor|monitor|provider|event|command> <name:str>",
  usageDelim: " ",
};
