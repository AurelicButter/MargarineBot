const { resolve, parse } = require("path");
const { walk } = require("fs-extra");

module.exports = (client, baseDir, type) => new Promise((res, rej) => {
  const dir = resolve(`${baseDir}/${type}/`);
  const files = [];
  try {
    walk(dir)
      .on("data", (item) => {
        const fileinfo = parse(item.path);
        if (!fileinfo.ext || fileinfo.ext !== ".js") { return; }
        files.push({
          path: fileinfo.dir,
          name: fileinfo.name,
          base: fileinfo.base,
          ext: fileinfo.ext,
        });
      })
      .on("end", () => { res(files); })
      .on("errors", (root, nodeStatsArray, next) => {
        nodeStatsArray.forEach((n) => {
          client.funcs.log(`[ERROR] " ${n.name}, "error"`);
          client.funcs.log(n.error.message || (`${n.error.code}: ${n.error.path}`), "error");
        });
        next();
      });
  } catch (err) { rej(err); }
});
