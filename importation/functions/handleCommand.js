module.exports = async (client, msg, command, args = undefined) => {
  const validCommand = this.getCommand(client, command);
  if (!validCommand) return;
  const response = this.runInhibitors(client, msg, validCommand);
  if (response) {
    if (typeof response === "string") msg.reply(response);
    return;
  }
  try {
    const params = await client.funcs.usage.run(client, msg, validCommand, args);
    validCommand.run(client, msg, params);
  } catch (error) {
    if (error) {
      if (error.code === 1 && client.config.cmdPrompt) {
        client.funcs.awaitMessage(client, msg, validCommand, error.args, error.message);
      } else {
        if (error.stack) client.emit("error", error.stack);
        msg.channel.send((error.message || error), { code: "json" }).catch(err => client.emit("error", err));
      }
    }
  }
};

exports.getCommand = (client, command) => {
  if (client.commands.has(command)) {
    return client.commands.get(command);
  } else if (client.aliases.has(command)) {
    return client.commands.get(client.aliases.get(command));
  }
  return false;
};

exports.runInhibitors = (client, msg, command) => {
  const priority = client.commandInhibitors.array().sort((low, high) => low.conf.priority < high.conf.priority);
  let response;
  priority.some((inhibitor) => { // eslint-disable-line
    if (inhibitor.conf.enabled) {
      response = inhibitor.run(client, msg, command);
      if (response) return true;
    }
  });
  return response;
};
