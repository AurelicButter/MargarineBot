const { copyAsync } = require("fs-extra-promise");
const { resolve } = require("path");

exports.run = (client, msg, [type, name]) => {
  copy(client, msg, type, name);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "transfer",
  description: "Transfers a core piece to its respected folder",
  usage: "<command|function|inhibitor|event|monitor> <name:str>",
  usageDelim: " ",
};

function copy(client, msg, type, name) {
  const coreDir = client.coreBaseDir;
  const clientDir = client.clientBaseDir;
  if (type !== "command") {
    copyAsync(resolve(`${coreDir}/${type}s/${name}.js`), resolve(`${clientDir}/${type}s/${name}.js`))
      .then(() => {
        client.funcs.reload[type](client, client.clientBaseDir, name).catch(response => msg.edit(`:x: ${response}`));
        msg.channel.send(`:white_check_mark: Successfully Transferred ${type}: ${name}`);
      })
      .catch((err) => {
        msg.channel.send(`Transfer of ${type}: ${name} to Client has failed. Please check your Console.`);
        client.funcs.log(err.stack, "error");
      });
  } else {
    copyAsync(resolve(`${coreDir}/${type}s/System/${name}.js`), resolve(`${clientDir}/${type}s/${name}.js`))
      .then(() => {
        client.funcs.reload[type](client, client.clientBaseDir, name).catch(response => msg.edit(`:x: ${response}`));
        msg.channel.send(`:white_check_mark: Successfully Transferred ${type}: ${name}`);
      })
      .catch((err) => {
        msg.channel.send(`Transfer of ${type}: ${name} to Client has failed. Please check your Console.`);
        client.funcs.log(err.stack, "error");
      });
  }
}
