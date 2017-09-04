const { sep } = require("path");
/* eslint-disable import/no-dynamic-require, global-require */
exports.function = (client, dir, funcName) => new Promise(async (resolve, reject) => {
  const files = await client.funcs.getFileListing(client, dir, "functions").catch(err => client.emit("error", client.funcs.newError(err)));
  if (client.funcs.hasOwnProperty(funcName)) { // eslint-disable-line no-prototype-builtins
    const oldFunction = files.filter(f => f.name === funcName);
    if (oldFunction[0]) {
      try {
        oldFunction.forEach((file) => {
          client.funcs[funcName] = "";
          client.funcs[funcName] = require(`${file.path}${sep}${file.base}`);
          if (client.funcs[funcName].init) {
            client.funcs[funcName].init(client);
          }
          delete require.cache[require.resolve(`${file.path}${sep}${file.base}`)];
        });
      } catch (e) {
        reject(`Could not load new function data: \`\`\`js\n${e.stack}\`\`\``);
        return;
      }
      resolve(`Successfully reloaded the function ${funcName}.`);
    } else {
      reject(`The function **${funcName}** does not reside in ${dir}functions`);
    }
  } else {
    const newFunction = files.filter(f => f.name === funcName);
    if (newFunction[0]) {
      try {
        newFunction.forEach((file) => {
          client.funcs[funcName] = require(`${file.path}${sep}${file.base}`);
          if (client.funcs[funcName].init) {
            client.funcs[funcName].init(client);
          }
        });
        resolve(`Successfully loaded a new function called ${funcName}.`);
      } catch (error) {
        if (error.code === "MODULE_NOT_FOUND") {
          const module = /'[^']+'/g.exec(error.toString());
          client.funcs.installNPM(module[0].slice(1, -1)).then(() => {
            client.funcs.reload.function(client, dir, funcName);
          }).catch((e) => {
            console.error(e);
            process.exit();
          });
        } else {
          reject(`Could not load new function data: \`\`\`js\n${error.stack}\`\`\``);
        }
      }
    } else {
      reject(`Could not locate a new function ${funcName} in ${dir}functions`);
    }
  }
});

exports.inhibitor = (client, dir, inhibName) => new Promise(async (resolve, reject) => {
  const files = await client.funcs.getFileListing(client, dir, "inhibitors").catch(err => client.emit("error", client.funcs.newError(err)));
  if (client.commandInhibitors.has(inhibName)) {
    const oldInhibitor = files.filter(f => f.name === inhibName);
    if (oldInhibitor[0]) {
      try {
        oldInhibitor.forEach((file) => {
          client.commandInhibitors.delete(file.name);
          const props = require(`${file.path}${sep}${file.base}`);
          client.commandInhibitors.set(file.name, props);
          if (props.init) {
            props.init(client);
          }
          delete require.cache[require.resolve(`${file.path}${sep}${file.base}`)];
        });
      } catch (e) {
        reject(`Could not load new inhibitor data: \`\`\`js\n${e.stack}\`\`\``);
        return;
      }
      resolve(`Successfully reloaded the inhibitor ${inhibName}`);
    } else {
      reject(`The inhibitor **${inhibName}** does not seem to reside in ${dir}inhibitors`);
    }
  } else {
    const newInhibitor = files.filter(f => f.name === inhibName);
    if (newInhibitor[0]) {
      try {
        newInhibitor.forEach((file) => {
          const props = require(`${file.path}${sep}${file.base}`);
          client.commandInhibitors.set(file.name, props);
          if (props.init) {
            props.init(client);
          }
        });
        resolve(`Successfully loaded a new inhibitor called ${inhibName}.`);
      } catch (error) {
        if (error.code === "MODULE_NOT_FOUND") {
          const module = /'[^']+'/g.exec(error.toString());
          client.funcs.installNPM(module[0].slice(1, -1)).then(() => {
            client.funcs.reload.inhibitor(client, dir, inhibName);
          }).catch((e) => {
            console.error(e);
            process.exit();
          });
        } else {
          reject(`Could not load new inhibitor data: \`\`\`js\n${error.stack}\`\`\``);
        }
      }
    } else {
      reject(`Could not locate a new inhibitor ${inhibName} in ${dir}inhibitors`);
    }
  }
});

exports.monitor = (client, dir, monitName) => new Promise(async (resolve, reject) => {
  const files = await client.funcs.getFileListing(client, dir, "monitors").catch(err => client.emit("error", client.funcs.newError(err)));
  if (client.messageMonitors.has(monitName)) {
    const oldMonitor = files.filter(f => f.name === monitName);
    if (oldMonitor[0]) {
      try {
        oldMonitor.forEach((file) => {
          client.messageMonitors.delete(file.name);
          const props = require(`${file.path}${sep}${file.base}`);
          client.messageMonitors.set(file.name, props);
          if (props.init) {
            props.init(client);
          }
          delete require.cache[require.resolve(`${file.path}${sep}${file.base}`)];
        });
      } catch (e) {
        reject(`Could not load new monitor data: \`\`\`js\n${e.stack}\`\`\``);
        return;
      }
      resolve(`Succesfully reloaded the monitor ${monitName}.`);
    } else {
      reject(`The monitor **${monitName}** does not reside in ${dir}monitors`);
    }
  } else {
    const newMonitor = files.filter(f => f.name === monitName);
    if (newMonitor[0]) {
      try {
        newMonitor.forEach((file) => {
          const props = require(`${file.path}${sep}${file.base}`);
          client.messageMonitors.set(file.name, props);
          if (props.init) {
            props.init(client);
          }
        });
        resolve(`Successfully loaded a new monitor called ${monitName}.`);
      } catch (error) {
        if (error.code === "MODULE_NOT_FOUND") {
          const module = /'[^']+'/g.exec(error.toString());
          client.funcs.installNPM(module[0].slice(1, -1)).then(() => {
            client.funcs.reload.monitor(client, dir, monitName);
          }).catch((e) => {
            console.error(e);
            process.exit();
          });
        } else {
          reject(`Could not load new monitor data: \`\`\`js\n${error.stack}\`\`\``);
        }
      }
    } else {
      reject(`Could not locate a new monitor ${monitName} in ${dir}monitors`);
    }
  }
});

exports.provider = (client, dir, providerName) => new Promise(async (resolve, reject) => {
  const files = await client.funcs.getFileListing(client, dir, "providers").catch(err => client.emit("error", client.funcs.newError(err)));
  if (client.providers.has(providerName)) {
    const oldProvider = files.filter(f => f.name === providerName);
    if (oldProvider[0]) {
      try {
        oldProvider.forEach((file) => {
          client.providers.delete(file.name);
          const props = require(`${file.path}${sep}${file.base}`);
          client.providers.set(file.name, props);
          if (props.init) {
            props.init(client);
          }
          delete require.cache[require.resolve(`${file.path}${sep}${file.base}`)];
        });
      } catch (e) {
        reject(`Could not load new provider data: \`\`\`js\n${e.stack}\`\`\``);
        return;
      }
      resolve(`Successfully reloaded the provider ${providerName}.`);
    } else {
      reject(`The provider **${providerName}** does not seem to reside in ${dir}providers`);
    }
  } else {
    const newProvider = files.filter(f => f.name === providerName);
    if (newProvider[0]) {
      try {
        newProvider.forEach((file) => {
          const props = require(`${file.path}${sep}${file.base}`);
          client.providers.set(file.name, props);
          if (props.init) {
            props.init(client);
          }
        });
        resolve(`Successfully loaded a new provider called ${providerName}.`);
      } catch (error) {
        if (error.code === "MODULE_NOT_FOUND") {
          const module = /'[^']+'/g.exec(error.toString());
          client.funcs.installNPM(module[0].slice(1, -1)).then(() => {
            client.funcs.reload.provider(client, dir, providerName);
          }).catch((e) => {
            console.error(e);
            process.exit();
          });
        } else {
          reject(`Could not load new provider data: \`\`\`js\n${error.stack}\`\`\``);
        }
      }
    } else {
      reject(`Could not locate a new provider ${providerName} in ${dir}providers`);
    }
  }
});

exports.event = (client, eventName) => new Promise(async (resolve, reject) => {
  const files = await client.funcs.getFileListing(client, client.clientBaseDir, "events").catch(err => client.emit("error", client.funcs.newError(err)));
  const file = files.find(f => f.name === eventName);
  if (file && file.name === eventName) {
    const runEvent = (...args) => require(`${file.path}${sep}${file.base}`).run(client, ...args);
    if (!client._events[eventName]) {
      client.on(file.name, runEvent);
      resolve(`Successfully loaded a new event called ${eventName}.`);
      return;
    }
    client.removeListener(eventName, runEvent);
    try {
      delete require.cache[require.resolve(`${file.path}${sep}${file.base}`)];
      client.on(file.name, runEvent);
    } catch (e) {
      reject(`Could not load new event data: \`\`\`js\n${e.stack}\`\`\``);
      return;
    }
    resolve(`Successfully reloaded the event ${eventName}`);
  } else {
    reject(`The event **${eventName}** does not seem to exist!`);
  }
});

exports.command = (client, dir, commandName) => new Promise(async (resolve, reject) => {
  let command;
  if (client.commands.has(commandName)) {
    command = commandName;
  } else if (client.aliases.has(commandName)) {
    command = client.aliases.get(commandName);
  }
  if (!command) {
    const files = await client.funcs.getFileListing(client, dir, "commands").catch(err => client.emit("error", client.funcs.newError(err)));
    const newCommands = files.filter(f => f.name === commandName);
    if (newCommands[0]) {
      newCommands.forEach(async (file) => {
        await client.funcs.loadSingleCommand(client, commandName, false, `${file.path}${sep}${file.base}`).catch(e => reject(`\`\`\`js\n${e}\`\`\``));
        resolve(`Successfully loaded a new command called ${commandName}`);
      });
    } else {
      reject(`Couldn't find a new command called ${commandName}`);
    }
  } else {
    await client.funcs.loadSingleCommand(client, command, true).catch(e => reject(e));
    resolve(`Successfully reloaded the command ${commandName}`);
  }
});
