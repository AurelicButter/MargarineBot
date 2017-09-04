const Config = require("../classes/Config.js");
const ArrayConfig = require("../classes/Configuration Types/Array.js");
const BooleanConfig = require("../classes/Configuration Types/Boolean.js");
const NumberConfig = require("../classes/Configuration Types/Number.js");
const StringConfig = require("../classes/Configuration Types/String.js");

exports.remove = guild => Config.remove(guild);

exports.has = guild => Config.guildConfs.has(guild.id);

exports.get = guild => Config.get(guild);

exports.addKey = (key, defaultValue, type = defaultValue.constructor.name) => Config.addKey(key, defaultValue, type);

exports.setKey = (key, defaultValue) => Config.setKey(key, defaultValue);

exports.resetKey = (guild, keys) => {
  const conf = Config.guildConfs.get(guild.id);
  if (keys instanceof Array) {
    keys.forEach((key) => {
      conf.reset(key);
    });
  } else {
    conf.reset(keys);
  }
  return Config.get(guild);
};

exports.delKey = key => Config.delKey(key);

exports.hasKey = key => Config.hasKey(key);

exports.set = (guild, key, value) => {
  if (!guild || !key || !value) return `You supplied: ${guild}, ${key}, ${value}. Please provide all three.`;
  const conf = Config.guildConfs.get(guild.id);
  if (conf[key] instanceof ArrayConfig) {
    if (!conf[key].data.includes(value)) return conf[key].add(value);
    return conf[key].del(value);
  } else if (conf[key] instanceof BooleanConfig) {
    return conf[key].toggle();
  } else if (conf[key] instanceof NumberConfig) {
    return conf[key].set(value);
  } else if (conf[key] instanceof StringConfig) {
    return conf[key].set(value);
  }
  return "Invalid Key or Invalid configuration type provided.";
};

exports.setMin = (guild, key, value) => {
  if (!guild || !key || !value) return `You supplied: ${guild}, ${key}, ${value}. Please provide all three.`;
  const conf = Config.guildConfs.get(guild.id);
  if (!(conf[key] instanceof NumberConfig)) return "You cannot use this function on a key that isn't a number key.";
  return conf[key].setMin(value);
};

exports.setMax = (guild, key, value) => {
  if (!guild || !key || !value) return `You supplied: ${guild}, ${key}, ${value}. Please provide all three.`;
  const conf = Config.guildConfs.get(guild.id);
  if (!(conf[key] instanceof NumberConfig)) return "You cannot use this function on a key that isn't a number key.";
  return conf[key].setMax(value);
};

exports.add = (guild, key, value) => {
  if (!guild || !key || !value) return `You supplied: ${guild}, ${key}, ${value}. Please provide all three.`;
  const conf = Config.guildConfs.get(guild.id);
  if (conf[key] instanceof StringConfig) {
    conf[key].add(value);
  } else if (conf[key] instanceof ArrayConfig) {
    conf[key].add(value);
  }
  return "You cannot use this function on a key that isn't an array or string key.";
};

exports.del = (guild, key, value) => {
  if (!guild || !key || !value) return `You supplied: ${guild}, ${key}, ${value}. Please provide all three.`;
  const conf = Config.guildConfs.get(guild.id);
  if (conf[key] instanceof StringConfig) {
    conf[key].del(value);
  } else if (conf[key] instanceof ArrayConfig) {
    conf[key].del(value);
  }
  return "You cannot use this function on a key that isn't an array or string key.";
};
