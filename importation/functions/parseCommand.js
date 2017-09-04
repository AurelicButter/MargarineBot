module.exports = (client, msg, usage = false) => {
  const prefix = this.getPrefix(client, msg);
  if (!prefix) return;
  const prefixLength = this.getLength(client, msg, prefix);
  if (usage) return prefixLength;
  return msg.content.slice(prefixLength).split(" ")[0].toLowerCase();
};

exports.getLength = (client, msg, prefix) => {
  if (client.config.prefixMention === prefix) {
    return prefix.exec(msg.content)[0].length + 1;
  }
  return prefix.exec(msg.content)[0].length;
};

exports.getPrefix = (client, msg) => {
  if (client.config.prefixMention.test(msg.content)) {
    return client.config.prefixMention;
  }
  let prefix = msg.guildConf.prefix;
  const escape = client.funcs.regExpEsc;
  if (prefix instanceof Array) {
    prefix.forEach((pref) => {
      if (msg.content.startsWith(pref)) prefix = pref;
      else prefix = false;
    });
  }
  if (prefix && msg.content.startsWith(prefix)) return new RegExp(`^${escape(prefix)}`); // eslint-disable-line
  return false;
};
