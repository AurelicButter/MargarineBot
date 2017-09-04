const { ensureDirAsync } = require("fs-extra-promise");
const { resolve, sep } = require("path");

const loadCommandInhibitors = (client, baseDir) => new Promise(async (res, rej) => {
  const dir = resolve(`${baseDir}./inhibitors/`);
  await ensureDirAsync(dir);
  let files = await client.funcs.getFileListing(client, baseDir, "inhibitors").catch(err => client.emit("error", client.funcs.newError(err)));
  files = files.filter(file => !client.commandInhibitors.get(file.name));
  try {
    const fn = files.map(f => new Promise((res) => {
      const props = require(`${f.path}${sep}${f.base}`);
      if (props.init) props.init(client);
      client.commandInhibitors.set(f.name, props);
      res(delete require.cache[require.resolve(`${f.path}${sep}${f.base}`)]);
    }));
    await Promise.all(fn).catch(e => client.funcs.log(e, "error"));
    res();
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      const module = /'[^']+'/g.exec(e.toString());
      await client.funcs.installNPM(module[0].slice(1, -1))
        .catch((err) => {
          console.error(err);
          process.exit();
        });
      loadCommandInhibitors(client, baseDir);
    } else {
      rej(e);
    }
  }
});

module.exports = async (client) => {
  client.commandInhibitors.clear();
  await loadCommandInhibitors(client, client.clientBaseDir).catch(err => client.emit("error", client.funcs.newError(err)));
  if (client.coreBaseDir !== client.clientBaseDir) {
    await loadCommandInhibitors(client, client.coreBaseDir).catch(err => client.emit("error", client.funcs.newError(err)));
  }
  client.funcs.log(`Loaded ${client.commandInhibitors.size} command inhibitors.`);
};
