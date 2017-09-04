const { sep } = require("path");

module.exports = (client, command, reload = false, loadPath = null) => new Promise(async (resolve, reject) => {
  let category;
  let subCategory;
  let cmd;
  if (!loadPath && !reload) return reject("Path must be provided when loading a new command.");
  if (reload) {
    if (!client.commands.has(command)) {
      reject("Reload requested, but command does not exist.");
    }
    try {
      cmd = client.commands.get(command);
      category = cmd.help.category;
      subCategory = cmd.help.subCategory;
      loadPath = cmd.help.filePath;
      client.aliases.forEach((cmds, alias) => {
        if (cmds === command) client.aliases.delete(alias);
      });
      delete require.cache[require.resolve(loadPath)];
      cmd = require(loadPath);
      if (cmd.init) {
        cmd.init(client);
      }
    } catch (e) {
      reject(`Could not load existing command data: \`\`\`js\n${e.stack}\`\`\``);
    }
  } else {
    try {
      cmd = require(loadPath);
      if (client.commands.has(cmd.help.name)) return resolve(delete require.cache[require.resolve(loadPath)]);
      if (cmd.conf.selfbot && !client.config.selfbot) {
        return reject(`The command \`${cmd.help.name}\` is only usable in selfbots!`);
      }
      delete require.cache[require.resolve(loadPath)];
      if (cmd.init) cmd.init(client);
      let pathParts = loadPath.split(sep);
      pathParts = pathParts.slice(pathParts.indexOf("commands") + 1);
      category = client.funcs.toTitleCase(cmd.help.category ? cmd.help.category : (pathParts[0] && pathParts[0].length > 0 && pathParts[0].indexOf(".") === -1 ? pathParts[0] : "General"));
      subCategory = client.funcs.toTitleCase(cmd.help.subCategory ? cmd.help.subCategory : (pathParts[1] && pathParts[1].length > 0 && pathParts[1].indexOf(".") === -1 ? pathParts[1] : "General"));
    } catch (e) {
      if (e.code === "MODULE_NOT_FOUND") {
        const module = /'[^']+'/g.exec(e.toString());
        await client.funcs.installNPM(module[0].slice(1, -1))
          .catch((err) => {
            console.error(err);
            process.exit();
          });
        client.funcs.loadSingleCommand(client, command, false, loadPath);
      } else {
        return reject(`Could not load the command: ${e.stack}`);
      }
    }
  }

  // complement data from meta
  cmd.help.category = category;
  cmd.help.subCategory = subCategory;
  cmd.help.filePath = loadPath;

  // Load Aliases
  cmd.conf.aliases.forEach((alias) => {
    client.aliases.set(alias, cmd.help.name);
  });

  // update help structure
  if (!client.helpStructure.has(category)) {
    client.helpStructure.set(category, new Map());
  }
  const catMap = client.helpStructure.get(category);
  if (!catMap.has(subCategory)) {
    catMap.set(subCategory, new Map());
  }
  const subCatMap = catMap.get(subCategory);
  subCatMap.set(cmd.help.name, cmd.help.description);

  client.commands.set(cmd.help.name, cmd);

  resolve(cmd);
  return true;
});
