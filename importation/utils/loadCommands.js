const { ensureDirAsync } = require("fs-extra-promise");
const { resolve, sep } = require("path");

const loadCommands = (client, baseDir) => new Promise(async (res, rej) => {
  const dir = resolve(`${baseDir}./commands/`);
  try {
    await ensureDirAsync(dir).catch(err => client.funcs.log(err, "error"));
    const files = await client.funcs.getFileListing(client, baseDir, "commands").catch(err => client.emit("error", client.funcs.newError(err)));
    const fn = files.map(f => client.funcs.loadSingleCommand(client, `${f.name}`, false, `${f.path}${sep}${f.base}`));
    await Promise.all(fn).catch(e => client.funcs.log(e, "error"));
    res();
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      const module = /'[^']+'/g.exec(e.toString());
      await client.funcs.installNPM(module[0].slice(1, -1))
        .catch((err) => {
          client.funcs.log(err, "error");
          process.exit();
        });
      loadCommands(client, baseDir);
    } else { rej(e); }
  }
});

module.exports = async (client) => {
  client.commands.clear();
  client.aliases.clear();
  await loadCommands(client, client.clientBaseDir).catch(err => client.emit("error", client.funcs.newError(err)));
  if (client.coreBaseDir !== client.clientBaseDir) {
    await loadCommands(client, client.coreBaseDir).catch(err => client.emit("error", client.funcs.newError(err)));
  }
  client.funcs.log(`Loaded ${client.commands.size} commands, with ${client.aliases.size} aliases.`);
};
