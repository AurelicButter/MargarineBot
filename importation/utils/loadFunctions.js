const { ensureDirAsync, readdirAsync } = require("fs-extra-promise");
const { resolve, sep } = require("path");

const loadFunctions = (client, baseDir) => new Promise(async (res, rej) => {
  const dir = resolve(`${baseDir}./functions/`);
  await ensureDirAsync(dir).catch(err => client.emit("error", err));
  let files = await readdirAsync(dir).catch(err => client.emit("error", err));
  files = files.filter(f => f.slice(-3) === ".js");
  files = files.filter(file => !client.funcs[file.split(".")[0]]);
  try {
    const fn = files.map(f => new Promise((res) => {
      const file = f.split(".");
      if (file[0] === "loadFunctions") res();
      client.funcs[file[0]] = require(`${dir}${sep}${f}`);
      if (client.funcs[file[0]].init) client.funcs[file[0]].init(client);
      res(delete require.cache[require.resolve(`${dir}${sep}${f}`)]);
    }));
    await Promise.all(fn).catch(e => client.emit("error", e));
    res();
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      const module = /'[^']+'/g.exec(e.toString());
      await client.funcs.installNPM(module[0].slice(1, -1))
        .catch((error) => {
          console.error(error);
          process.exit();
        });
      loadFunctions(client, baseDir);
    } else { rej(e); }
  }
});

module.exports = client => new Promise(async (resolve, reject) => {
  await loadFunctions(client, client.clientBaseDir).catch(reject);
  if (client.coreBaseDir !== client.clientBaseDir) {
    await loadFunctions(client, client.coreBaseDir).catch(reject);
  }
  client.funcs.log(`Loaded ${Object.keys(client.funcs).length} functions.`);
  resolve();
});
