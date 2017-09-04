const { parse } = require("url");

exports.conf = {
  enabled: true,
  spamProtection: true,
  priority: 5,
};

exports.run = (client, msg, cmd, args = undefined) => new Promise((resolve, reject) => {
  const usage = client.funcs.parseUsage(cmd.help.usage);
  const prefixLength = client.funcs.parseCommand(client, msg, true);
  if (args === undefined) {
    args = msg.content.slice(prefixLength)
      .split(" ")
      .slice(1)
      .join(" ")
      .split(cmd.help.usageDelim !== "" ? cmd.help.usageDelim : undefined);
  }
  if (args[0] === "") args = [];
  let currentUsage;
  let repeat = false;
  if (usage.length === 0) return resolve();
  (function validateArgs(i) {
    if (i >= usage.length && i >= args.length) {
      return resolve(args);
    } else if (usage[i]) {
      if (usage[i].type !== "repeat") { // Handle if args length > usage length
        currentUsage = usage[i];
      } else if (usage[i].type === "repeat") { // Handle if usage ends in a repeat
        currentUsage.type = "optional"; // if there are no optional args passed
        repeat = true;
      }
    } else if (!repeat) { // Handle if usage does not end in a repeat
      return resolve(args);
    }
    if (currentUsage.type === "optional" && (args[i] === undefined || args[i] === "")) { // Handle if args length < required usage length
      if (usage.slice(i).some(u => u.type === "required")) {
        args.splice(i, 1, null);
        return reject(client.funcs.newError("Missing one or more required arguments after end of input.", 1, args));
      }
      return resolve(args);
    } else if (currentUsage.type === "required" && args[i] === undefined) {
      args.splice(i, 1, null);
      return reject(client.funcs.newError(currentUsage.possibles.length === 1 ? `${currentUsage.possibles[0].name} is a required argument.` : `Missing a required option: (${currentUsage.possibles.map(p => p.name).join(", ")})`, 1, args));
    } else if (currentUsage.possibles.length === 1) {
      switch (currentUsage.possibles[0].type) {
        case "literal":
          if (args[i].toLowerCase() === currentUsage.possibles[0].name.toLowerCase()) {
            args[i] = args[i].toLowerCase();
            validateArgs(++i);
          } else if (currentUsage.type === "optional" && !repeat) {
            args.splice(i, 0, undefined);
            validateArgs(++i);
          } else {
            args.splice(i, 1, null);
            return reject(client.funcs.newError(`Your option did not literally match the only possibility: (${currentUsage.possibles.map(p => p.name).join(", ")}).. This is likely caused by a mistake in the usage string.`, 1, args));
          }
          break;
        case "msg":
        case "message":
          if (/^\d+$/.test(args[i])) {
            if (client.config.selfbot) {
              msg.channel.fetchMessages({
                around: args[i],
              }).then((m) => {
                args[i] = m.filter(e => e.id === args[i]).first();
                validateArgs(++i);
              }).catch(() => {
                if (currentUsage.type === "optional" && !repeat) {
                  args.splice(i, 0, undefined);
                  validateArgs(++i);
                } else {
                  args.splice(i, 1, null);
                  return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be a valid message id.`, 1, args));
                }
              });
            } else {
              msg.channel.fetchMessage(args[i])
                .then((m) => {
                  args[i] = m;
                  validateArgs(++i);
                })
                .catch(() => {
                  if (currentUsage.type === "optional" && !repeat) {
                    args.splice(i, 0, undefined);
                    validateArgs(++i);
                  } else {
                    args.splice(i, 1, null);
                    return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be a valid message id.`, 1, args));
                  }
                });
            }
          } else if (currentUsage.type === "optional" && !repeat) {
            args.splice(i, 0, undefined);
            validateArgs(++i);
          } else {
            args.splice(i, 1, null);
            return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be a valid message id.`, 1, args));
          }
          break;
        case "user":
        case "mention":
          if ((/^<@!?\d+>$/.test(args[i]) && client.users.has(/\d+/.exec(args[i])[0])) || (/\d+/.test(args[i]) && client.users.has(/\d+/.exec(args[i])[0]) && args[i].length > 5)) {
            args[i] = client.users.get(/\d+/.exec(args[i])[0]);
            validateArgs(++i);
          } else if (currentUsage.type === "optional" && !repeat) {
            args.splice(i, 0, undefined);
            validateArgs(++i);
          } else {
            args.splice(i, 1, null);
            return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be a mention or valid user id.`, 1, args));
          }
          break;
        case "boolean":
          if (/^true|false$/.test(args[i])) {
            if (args[i] === "true") {
              args[i] = true;
            } else { args[i] = false; }
            validateArgs(++i);
          } else if (currentUsage.type === "optional" && !repeat) {
            args.splice(i, 0, undefined);
            validateArgs(++i);
          } else {
            args.splice(i, 1, null);
            return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be true or false.`, 1, args));
          }
          break;
        case "member":
          if ((/^<@!?\d+>$/.test(args[i]) && msg.guild.members.has(/\d+/.exec(args[i])[0])) || (/\d+/.test(args[i]) && msg.guild.members.has(/\d+/.exec(args[i])[0]) && args[i].length > 5)) {
            args[i] = msg.guild.members.get(/\d+/.exec(args[i])[0]);
            validateArgs(++i);
          } else if (currentUsage.type === "optional" && !repeat) {
            args.splice(i, 0, undefined);
            validateArgs(++i);
          } else {
            args.splice(i, 1, null);
            return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be a mention or valid user id.`, 1, args));
          }
          break;
        case "channel":
          if (/^<#\d+>$/.test(args[i]) || client.channels.has(args[i])) {
            args[i] = client.channels.get(/\d+/.exec(args[i])[0]);
            validateArgs(++i);
          } else if (currentUsage.type === "optional" && !repeat) {
            args.splice(i, 0, undefined);
            validateArgs(++i);
          } else {
            args.splice(i, 1, null);
            return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be a channel tag or valid channel id.`, 1, args));
          }
          break;
        case "guild":
          if (client.guilds.has(args[i])) {
            args[i] = client.guilds.get(/\d+/.exec(args[i])[0]);
            validateArgs(++i);
          } else if (currentUsage.type === "optional" && !repeat) {
            args.splice(i, 0, undefined);
            validateArgs(++i);
          } else {
            args.splice(i, 1, null);
            return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be a valid guild id.`, 1, args));
          }
          break;
        case "role":
          if (/^<@&\d+>$/.test(args[i]) || msg.guild.roles.has(args[i])) {
            args[i] = msg.guild.roles.get(/\d+/.exec(args[i])[0]);
            validateArgs(++i);
          } else if (currentUsage.type === "optional" && !repeat) {
            args.splice(i, 0, undefined);
            validateArgs(++i);
          } else {
            args.splice(i, 1, null);
            return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be a role mention or role id.`, 1, args));
          }
          break;
        case "str":
        case "string":
          if (currentUsage.possibles[0].min && currentUsage.possibles[0].max) {
            if (args[i].length < currentUsage.possibles[0].min || args[i].length > currentUsage.possibles[0].max) {
              if (currentUsage.type === "optional" && !repeat) {
                args.splice(i, 0, undefined);
                validateArgs(++i);
              } else if (currentUsage.possibles[0].min === currentUsage.possibles[0].max) {
                args.splice(i, 1, null);
                return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be exactly ${currentUsage.possibles[0].min} characters.`, 1, args));
              } else {
                args.splice(i, 1, null);
                return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be between ${currentUsage.possibles[0].min} and ${currentUsage.possibles[0].max} characters.`, 1, args));
              }
            } else { validateArgs(++i); }
          } else if (currentUsage.possibles[0].min) {
            if (args[i].length < currentUsage.possibles[0].min) {
              if (currentUsage.type === "optional" && !repeat) {
                args.splice(i, 0, undefined);
                validateArgs(++i);
              } else {
                args.splice(i, 1, null);
                return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be longer than ${currentUsage.possibles[0].min} characters.`, 1, args));
              }
            } else { validateArgs(++i); }
          } else if (currentUsage.possibles[0].max) {
            if (args[i].length > currentUsage.possibles[0].max) {
              if (currentUsage.type === "optional" && !repeat) {
                args.splice(i, 0, undefined);
                validateArgs(++i);
              } else {
                args.splice(i, 1, null);
                return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be shorter than ${currentUsage.possibles[0].max} characters.`, 1, args));
              }
            } else { validateArgs(++i); }
          } else { validateArgs(++i); }
          break;
        case "int":
        case "integer":
          if (!Number.isInteger(parseInt(args[i]))) {
            if (currentUsage.type === "optional" && !repeat) {
              args.splice(i, 0, undefined);
              validateArgs(++i);
            } else {
              args.splice(i, 1, null);
              return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be an integer.`, 1, args));
            }
          } else if (currentUsage.possibles[0].min && currentUsage.possibles[0].max) {
            args[i] = parseInt(args[i]);
            if (args[i] < currentUsage.possibles[0].min || args[i] > currentUsage.possibles[0].max) {
              if (currentUsage.possibles[0].min === currentUsage.possibles[0].max) {
                if (currentUsage.type === "optional" && !repeat) {
                  args.splice(i, 0, undefined);
                  validateArgs(++i);
                } else {
                  args.splice(i, 1, null);
                  return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be exactly ${currentUsage.possibles[0].min}... So why didn't the dev use a literal?`, 1, args));
                }
              } else if (currentUsage.type === "optional" && !repeat) {
                args.splice(i, 0, undefined);
                validateArgs(++i);
              } else {
                args.splice(i, 1, null);
                return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be between ${currentUsage.possibles[0].min} and ${currentUsage.possibles[0].max}.`, 1, args));
              }
            } else { validateArgs(++i); }
          } else if (currentUsage.possibles[0].min) {
            args[i] = parseInt(args[i]);
            if (args[i] < currentUsage.possibles[0].min) {
              if (currentUsage.type === "optional" && !repeat) {
                args.splice(i, 0, undefined);
                validateArgs(++i);
              } else {
                args.splice(i, 1, null);
                return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be greater than ${currentUsage.possibles[0].min}.`, 1, args));
              }
            } else { validateArgs(++i); }
          } else if (currentUsage.possibles[0].max) {
            args[i] = parseInt(args[i]);
            if (args[i] > currentUsage.possibles[0].max) {
              if (currentUsage.type === "optional" && !repeat) {
                args.splice(i, 0, undefined);
                validateArgs(++i);
              } else {
                args.splice(i, 1, null);
                return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be less than ${currentUsage.possibles[0].max}.`, 1, args));
              }
            } else { validateArgs(++i); }
          } else {
            args[i] = parseInt(args[i]);
            validateArgs(++i);
          }
          break;
        case "num":
        case "number":
        case "float":
          if (isNaN(parseFloat(args[i]))) {
            if (currentUsage.type === "optional" && !repeat) {
              args.splice(i, 0, undefined);
              validateArgs(++i);
            } else {
              args.splice(i, 1, null);
              return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be a valid number.`, 1, args));
            }
          } else if (currentUsage.possibles[0].min && currentUsage.possibles[0].max) {
            args[i] = parseFloat(args[i]);
            if (args[i] < currentUsage.possibles[0].min || args[i] > currentUsage.possibles[0].max) {
              if (currentUsage.possibles[0].min === currentUsage.possibles[0].max) {
                if (currentUsage.type === "optional" && !repeat) {
                  args.splice(i, 0, undefined);
                  validateArgs(++i);
                } else {
                  args.splice(i, 1, null);
                  return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be exactly ${currentUsage.possibles[0].min}... So why didn't the dev use a literal?`, 1, args));
                }
              } else if (currentUsage.type === "optional" && !repeat) {
                args.splice(i, 0, undefined);
                validateArgs(++i);
              } else {
                args.splice(i, 1, null);
                return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be between ${currentUsage.possibles[0].min} and ${currentUsage.possibles[0].max}.`, 1, args));
              }
            } else { validateArgs(++i); }
          } else if (currentUsage.possibles[0].min) {
            args[i] = parseFloat(args[i]);
            if (args[i] < currentUsage.possibles[0].min) {
              if (currentUsage.type === "optional" && !repeat) {
                args.splice(i, 0, undefined);
                validateArgs(++i);
              } else {
                args.splice(i, 1, null);
                return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be greater than ${currentUsage.possibles[0].min}.`, 1, args));
              }
            } else { validateArgs(++i); }
          } else if (currentUsage.possibles[0].max) {
            args[i] = parseFloat(args[i]);
            if (args[i] > currentUsage.possibles[0].max) {
              if (currentUsage.type === "optional" && !repeat) {
                args.splice(i, 0, undefined);
                validateArgs(++i);
              } else {
                args.splice(i, 1, null);
                return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be less than ${currentUsage.possibles[0].max}.`, 1, args));
              }
            } else {
              validateArgs(++i);
            }
          } else {
            args[i] = parseFloat(args[i]);
            validateArgs(++i);
          }
          break;
        case "url": // eslint-disable-line no-case-declarations
          const res = parse(args[i]);
          if (!res.protocol && !res.hostname) {
            if (currentUsage.type === "optional" && !repeat) {
              args.splice(i, 0, undefined);
              validateArgs(++i);
            } else {
              args.splice(i, 1, null);
              return reject(client.funcs.newError(`${currentUsage.possibles[0].name} must be a valid `, 1, args));
            }
          } else {
            validateArgs(++i);
          }
          break;
        default:
          console.warn("Unknown Argument Type encountered");
          validateArgs(++i);
          break;
      }
    } else {
      let validated = false;
      (function multiPossibles(p) {
        if (validated) {
          validateArgs(++i);
          return;
        } else if (p >= currentUsage.possibles.length) {
          if (currentUsage.type === "optional" && !repeat) {
            args.splice(i, 0, undefined);
            validateArgs(++i);
          } else {
            args.splice(i, 1, null);
            reject(client.funcs.newError(`Your option didn't match any of the possibilities: (${currentUsage.possibles.map(possibles => possibles.name).join(", ")})`, 1, args));
          }
          return;
        }
        switch (currentUsage.possibles[p].type) {
          case "literal":
            if (args[i].toLowerCase() === currentUsage.possibles[p].name.toLowerCase()) {
              args[i] = args[i].toLowerCase();
              validated = true;
              multiPossibles(++p);
            } else {
              multiPossibles(++p);
            }
            break;
          case "msg":
          case "message":
            if (/^\d+$/.test(args[i])) {
              msg.channel.fetchMessage(args[i])
                .then((m) => {
                  args[i] = m;
                  validated = true;
                  multiPossibles(++p);
                })
                .catch(() => {
                  multiPossibles(++p);
                });
            } else {
              multiPossibles(++p);
            }
            break;
          case "user":
          case "mention": {
            const result = /\d+/.exec(args[i]);
            if (result && args[i].length > 5 && client.users.has(result[0])) {
              args[i] = client.users.get(/\d+/.exec(args[i])[0]);
              validated = true;
              multiPossibles(++p);
            } else {
              multiPossibles(++p);
            }
            break;
          }
          case "boolean":
            if (/^true|false$/.test(args[i])) {
              if (args[i] === "true") args[i] = true;
              else args[i] = false;
              validated = true;
              multiPossibles(++p);
            } else {
              multiPossibles(++p);
            }
            break;
          case "member": {
            const result = /\d+/.exec(args[i]);
            if (result && args[i].length > 5 && msg.guild.members.has(result[0])) {
              args[i] = msg.guild.members.get(/\d+/.exec(args[i])[0]);
              validated = true;
              multiPossibles(++p);
            } else {
              multiPossibles(++p);
            }
            break;
          }
          case "channel":
            if (/^<#\d+>$/.test(args[i]) || client.channels.has(args[i])) {
              args[i] = client.channels.get(/\d+/.exec(args[i])[0]);
              validated = true;
              multiPossibles(++p);
            } else {
              multiPossibles(++p);
            }
            break;
          case "guild":
            if (client.guilds.has(args[i])) {
              args[i] = client.guilds.get(/\d+/.exec(args[i])[0]);
              validated = true;
              multiPossibles(++p);
            } else {
              multiPossibles(++p);
            }
            break;
          case "role":
            if (/^<@&\d+>$/.test(args[i]) || msg.guild.roles.has(args[i])) {
              args[i] = msg.guild.roles.get(/\d+/.exec(args[i])[0]);
              validated = true;
              multiPossibles(++p);
            } else {
              multiPossibles(++p);
            }
            break;
          case "str":
          case "string":
            if (currentUsage.possibles[p].min && currentUsage.possibles[p].max) {
              if (args[i].length <= currentUsage.possibles[p].max && args[i].length >= currentUsage.possibles[p].min) {
                validated = true;
                multiPossibles(++p);
              } else {
                multiPossibles(++p);
              }
            } else if (currentUsage.possibles[p].min) {
              if (args[i].length >= currentUsage.possibles[p].min) {
                validated = true;
                multiPossibles(++p);
              } else {
                multiPossibles(++p);
              }
            } else if (currentUsage.possibles[p].max) {
              if (args[i].length <= currentUsage.possibles[p].max) {
                validated = true;
                multiPossibles(++p);
              } else {
                multiPossibles(++p);
              }
            } else {
              validated = true;
              multiPossibles(++p);
            }
            break;
          case "int":
          case "integer":
            if (Number.isInteger(parseInt(args[i]))) {
              args[i] = parseInt(args[i]);
              if (currentUsage.possibles[p].min && currentUsage.possibles[p].max) {
                if (args[i] <= currentUsage.possibles[p].max && args[i] >= currentUsage.possibles[p].min) {
                  validated = true;
                  multiPossibles(++p);
                } else {
                  multiPossibles(++p);
                }
              } else if (currentUsage.possibles[p].min) {
                if (args[i] >= currentUsage.possibles[p].min) {
                  validated = true;
                  multiPossibles(++p);
                } else {
                  multiPossibles(++p);
                }
              } else if (currentUsage.possibles[p].max) {
                if (args[i] <= currentUsage.possibles[p].max) {
                  validated = true;
                  multiPossibles(++p);
                } else {
                  multiPossibles(++p);
                }
              } else {
                validated = true;
                multiPossibles(++p);
              }
            } else {
              multiPossibles(++p);
            }
            break;
          case "num":
          case "number":
          case "float":
            if (isNaN(parseFloat(args[i]))) {
              args[i] = parseFloat(args[i]);
              if (currentUsage.possibles[p].min && currentUsage.possibles[p].max) {
                if (args[i] <= currentUsage.possibles[p].max && args[i] >= currentUsage.possibles[p].min) {
                  validated = true;
                  multiPossibles(++p);
                } else {
                  multiPossibles(++p);
                }
              } else if (currentUsage.possibles[p].min) {
                if (args[i] >= currentUsage.possibles[p].min) {
                  validated = true;
                  multiPossibles(++p);
                } else {
                  multiPossibles(++p);
                }
              } else if (currentUsage.possibles[p].max) {
                if (args[i] <= currentUsage.possibles[p].max) {
                  validated = true;
                  multiPossibles(++p);
                } else {
                  multiPossibles(++p);
                }
              } else {
                validated = true;
                multiPossibles(++p);
              }
            } else {
              multiPossibles(++p);
            }
            break;
          case "url": // eslint-disable-line no-case-declarations
            const res = parse(args[i]);
            if (res.protocol && res.hostname) {
              validated = true;
              multiPossibles(++p);
            } else {
              multiPossibles(++p);
            }
            break;
          default:
            console.warn("Unknown Argument Type encountered");
            multiPossibles(++p);
            break;
        }
      }(0));
    }
  }(0));
});
