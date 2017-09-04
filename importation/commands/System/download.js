const { get: snek } = require("snekfetch");
const { ensureDirAsync, writeFileAsync, unlinkAsync } = require("fs-extra-promise");
const { sep, resolve } = require("path");
const { runInNewContext } = require("vm");

const piecesURL = "https://raw.githubusercontent.com/dirigeants/komada-pieces/master/";
const types = ["commands", "functions", "monitors", "inhibitors", "providers"];

const mod = { exports: {} };

/* eslint-disable no-throw-literal, no-use-before-define */
exports.run = async (client, msg, [link, piece, folder = "Downloaded"]) => {
  const proposedURL = types.includes(link) ? `${piecesURL}${link}/${piece}.js` : link;
  if (link === "commands" && !/\w+\/\w+/.test(piece)) {
    return msg.channel.send(`${msg.author} | You provided an invalid or no subfolder for a command. Please provide a valid folder name from the Pieces Repo. Example: Misc/test`);
  }

  return requestAndCheck(proposedURL)
    .then(text => process(client, msg, text, link, folder))
    .catch(err => msg.channel.send(`${msg.author} | ${err}`));
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "download",
  description: "Downloads a piece, either from a link or our Pieces Repository, and installs it.",
  usage: "<commands|functions|monitors|inhibitors|providers|url:url> [location:str] [folder:str]",
  usageDelim: " ",
};

const process = async (client, msg, text, link, folder) => {
  try {
    runInNewContext(text, { module: mod, exports: mod.exports, require }, { timeout: 500 });
  } catch (err) {
    return client.funcs.log(err, "error");
  }

  const name = mod.exports.help.name;
  const description = mod.exports.help.description || "No description provided.";
  const type = mod.exports.help.type || link;
  const modules = mod.exports.conf.requiredModules || "No required modules.. Yay!";

  try {
    runChecks(client, type, name);
    if (mod.exports.conf.selfbot && client.user.bot) throw `I am not a selfbot, so I cannot download nor use ${name}.`;
  } catch (err) {
    return msg.channel.send(`${msg.author} | ${err}`);
  }

  const code = [
    "```asciidoc",
    "=== NAME ===",
    name,
    "\n=== DESCRIPTION ===",
    description,
    "\n=== REQUIRED MODULES ===",
    modules,
    "```",
  ];

  const message = await msg.channel.send(`Are you sure you want to load the following ${type} into your bot? This will also install all required modules. This prompt will abort after 20 seconds.${code.join("\n")}`);
  const collector = msg.channel.createMessageCollector(m => m.author === msg.author, { time: 20000 });

  collector.on("collect", (mes) => {
    if (mes.content.toLowerCase() === "no") collector.stop("aborted");
    if (mes.content.toLowerCase() === "yes") collector.stop("success");
  });

  collector.on("end", async (collected, reason) => {
    if (reason === "aborted") return message.edit(`📵 Load aborted, ${type} not installed.`);
    else if (reason === "time") return message.edit(`⏲ Load aborted, ${type} not installed. You ran out of time.`);
    await message.edit(`📥 \`Loading ${type}\``).catch(err => client.funcs.log(err, "error"));
    if (Array.isArray(modules) && modules.length > 0) {
      await client.funcs.installNPM(modules.join(" "))
        .catch((err) => {
          client.funcs.log(err, "error");
          process.exit();
        });
    }
    return load[type](client, msg, message, type, text, name, mod.exports.help.category || client.funcs.toTitleCase(folder));
  });

  return true;
};

const requestAndCheck = async newURL => snek(newURL)
  .then(d => d.text)
  .catch((error) => {
    if (error.message === "Unexpected token <") throw `An error has occured: **${error.message}** | This typically happens when you try to download a file from a link that isn't raw github information. Try a raw link instead!`;
    if (error.message === "Not Found") throw `An error has occured: **${error.message}** | This typically happens when you try to download a piece that doesn't exist. Try verifying it exists.`;
    throw `An error has occured: **${error}** | We're not sure what happened here... Report this to our Developers to get it checked out!`;
  });

const runChecks = (client, type, name) => {
  if (!name) throw "I have stopped the load of this piece because it does not have a name value, and I cannot determine the file name without it. Please ask the Developer of this piece to add it.";
  if (!type) throw "I have stopped the load of this piece because it does not have a type value, and I cannot determine the type without it. Please ask the Developer of the piece to add it.";
  if (!types.includes(type)) throw "I have stopped the loading of this piece because its type value doesn't match those we accept. Please ask the Developer of the piece to fix it.";
  switch (type) {
    case "commands":
      if (client.commands.has(name)) throw "That command already exists in your bot. Aborting the load.";
      break;
    case "functions":
      if (client.funcs[name]) throw "That function already exists in your bot. Aborting the load.";
      break;
    case "inhibitors":
      if (client.commandInhibitors.has(name)) throw "That command inhibitor already exists in your bot. Aborting the load.";
      break;
    case "monitors":
      if (client.messageMonitors.has(name)) throw "That message monitor already exists in your bot. Aborting the load.";
      break;
    case "providers":
      if (client.providers.has(name)) throw "That provider already exists in your bot. Aborting the load.";
      break;
    // no default
  }
};

const load = {
  commands: async (client, msg, message, type, res, name, category) => {
    const dir = resolve(`${client.clientBaseDir}/commands/${category}/`) + sep;
    await message.edit(`📥 \`Loading ${type} into ${dir}${name}.js...\``);
    await ensureDirAsync(dir).catch(err => client.funcs.log(err, "error"));
    await writeFileAsync(`${dir}${name}.js`, res);
    return client.funcs.reload.command(client, dir, name)
      .then(response => message.edit(`📥 ${response}`))
      .catch((response) => {
        message.edit(`📵 Command load failed ${name}\n\`\`\`${response}\`\`\``);
        return unlinkAsync(`${dir}${name}.js`);
      });
  },
  functions: async (client, msg, message, type, res, name) => {
    const dir = resolve(`${client.clientBaseDir}/functions/`) + sep;
    await message.edit(`📥 \`Loading ${type} into ${dir}${name}.js...\``);
    await ensureDirAsync(dir).catch(err => client.funcs.log(err, "error"));
    await writeFileAsync(`${dir}${name}.js`, res).catch(err => client.funcs.log(err, "error"));
    return client.funcs.reload.function(client, dir, name)
      .then(response => message.edit(`📥 ${response}`))
      .catch((response) => {
        message.edit(`📵 Function load failed ${name}\n\`\`\`${response}\`\`\``);
        return unlinkAsync(`${dir}${name}.js`);
      });
  },
  inhibitors: async (client, msg, message, type, res, name) => {
    const dir = resolve(`${client.clientBaseDir}/inhibitors/`) + sep;
    await message.edit(`📥 \`Loading ${type} into ${dir}${name}.js...\``);
    await ensureDirAsync(dir).catch(err => client.funcs.log(err, "error"));
    await writeFileAsync(`${dir}${name}.js`, res).catch(err => client.funcs.log(err, "error"));
    return client.funcs.reload.inhibitor(client, dir, name)
      .then(response => message.edit(`📥 ${response}`))
      .catch((response) => {
        message.edit(`📵 Inhibitor load failed ${name}\n\`\`\`${response}\`\`\``);
        return unlinkAsync(`${dir}${name}.js`);
      });
  },
  monitors: async (client, msg, message, type, res, name) => {
    const dir = resolve(`${client.clientBaseDir}/monitors/`) + sep;
    await message.edit(`📥 \`Loading ${type} into ${dir}${name}.js...\``);
    await ensureDirAsync(dir).catch(err => client.funcs.log(err, "error"));
    await writeFileAsync(`${dir}${name}.js`, res).catch(err => client.funcs.log(err, "error"));
    return client.funcs.reload.monitor(client, dir, name)
      .then(response => message.edit(`📥 ${response}`))
      .catch((response) => {
        message.edit(`📵 Monitor load failed ${name}\n\`\`\`${response}\`\`\``);
        return unlinkAsync(`${dir}${name}.js`);
      });
  },
  providers: async (client, msg, message, type, res, name) => {
    const dir = resolve(`${client.clientBaseDir}/providers/`) + sep;
    await message.edit(`📥 \`Loading ${type} into ${dir}${name}.js...\``);
    await ensureDirAsync(dir).catch(err => client.funcs.log(err, "error"));
    await writeFileAsync(`${dir}${name}.js`, res).catch(err => client.funcs.log(err, "error"));
    return client.funcs.reload.provider(client, dir, name)
      .then(response => message.edit(`📥 ${response}`))
      .catch((response) => {
        message.edit(`📵 Provider load failed ${name}\n\`\`\`${response}\`\`\``);
        return unlinkAsync(`${dir}${name}.js`);
      });
  },
};
