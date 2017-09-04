const { ensureDirAsync } = require("fs-extra-promise");
const { resolve, sep } = require("path");
const getFileListing = require("../functions/getFileListing.js");
const log = require("../functions/log.js");

let events = require("discord.js/src/util/Constants.js").Events;

events = Object.keys(events).map(k => events[k]);

const loadEvents = (client, baseDir, counts) => new Promise(async (res) => {
  const dir = resolve(`${baseDir}./events/`);
  await ensureDirAsync(dir).catch(err => client.emit("error", err));
  let files = await getFileListing(client, baseDir, "events").catch(err => client.emit("error", err));
  files = files.filter(f => events.includes(f.name));
  files.forEach((f) => {
    client.on(f.name, (...args) => require(`${f.path}${sep}${f.base}`).run(client, ...args));
    counts++;
  });
  res(counts);
});


module.exports = async (client) => {
  let counts = 0;
  counts = await loadEvents(client, client.coreBaseDir, counts).catch(err => client.emit("error", client.funcs.newError(err)));
  if (client.coreBaseDir !== client.clientBaseDir) {
    counts = await loadEvents(client, client.clientBaseDir, counts).catch(err => client.emit("error", client.funcs.newError(err)));
  }
  log(`Loaded ${counts} events`);
};
