const { Language } = require("klasa");

/* For use in Klasa System - Margarine Style responses, msg is required but
 * will be mimiced so that speechHelper doesn't error out.
 */
const falseMsg = {
	//No client as each message use with this will use func-*
	guild: { 
		settings: {
			prefix: "m~", //Use default global prefix for now.
			language: "en-CA"
		}
	}
}

module.exports = class extends Language {
    constructor(...args) {
        super(...args, {
            name: "en-CA",
            enabled: true
        });

        this.language = {
            DEFAULT: (key) => `${key} has not been localized for en-CA yet.`,
			DEFAULT_LANGUAGE: "Default Language",
			NOCHANNEL: "No channel set",
			MISSINGTERM: (action) => this.client.speech(falseMsg, ["func-system", "missingterm"], ["-action", action]),

			/*
			 * Klasa System - Margarine Style Responses
			 */
			INHIBITOR_COOLDOWN: (remaining) => this.client.speech(falseMsg, ["func-system", "inhibitor", "cooldown"], [["-remaining", `${remaining} second${remaining === 1 ? '' : 's'}`]]),
			INHIBITOR_DISABLED_GUILD: this.client.speech(falseMsg, ["func-system", "inhibitor", "guildDisable"]),
			INHIBITOR_DISABLED_GLOBAL: this.client.speech(falseMsg, ["func-system", "inhibitor", "globalDisable"]),
			INHIBITOR_NSFW: this.client.speech(falseMsg, ["func-system", "inhibitor", "NSFW"]),
			INHIBITOR_PERMISSIONS: this.client.speech(falseMsg, ["func-system", "inhibitor", "noPermission"]),
			COMMANDMESSAGE_MISSING_REQUIRED: (name) => this.client.speech(falseMsg, ["func-system", "commandhandler", "missingArg"], [["-name", name]]),
			COMMANDMESSAGE_MISSING: this.client.speech(falseMsg, ["func-system", "commandhandler", "missing"]),
			COMMANDMESSAGE_MISSING_OPTIONALS: (possibles) => this.client.speech(falseMsg, ["func-system", "commandhandler", "optMissing"], [["-possibles", possibles]]),
			COMMANDMESSAGE_NOMATCH: (possibles) => this.client.speech(falseMsg, ["func-system", "commandhandler", "noMatch"], [["-possibles", possibles]]),

			RESOLVER_MINMAX_EXACTLY: (name, min, suffix) => this.client.speech(falseMsg, ["func-system", "resolver", "minMax", "exactly"], [
				["-name", name], ["-min", min], ["-suffix", suffix]
			]),
			RESOLVER_MINMAX_BOTH: (name, min, max, suffix) => this.client.speech(falseMsg, ["func-system", "resolver", "minMax", "both"], [
				["-name", name], ["-min", min], ["-max", max] ["-suffix", suffix]
			]),
			RESOLVER_MINMAX_MIN: (name, min, suffix) => this.client.speech(falseMsg, ["func-system", "resolver", "minMax", "min"], [
				["-name", name], ["-min", min]
			]),
			RESOLVER_MINMAX_MAX: (name, max, suffix) => this.client.speech(falseMsg, ["func-system", "resolver", "minMax", "max"], [
				["-name", name], ["-max", max]
			]),

			/*
			 * Klasa System. Copied over from Klasa's en-US.
			 */
			SETTING_GATEWAY_EXPECTS_GUILD: 'The parameter <Guild> expects either a Guild or a Guild Object.',
			SETTING_GATEWAY_VALUE_FOR_KEY_NOEXT: (data, key) => `The value ${data} for the key ${key} does not exist.`,
			SETTING_GATEWAY_VALUE_FOR_KEY_ALREXT: (data, key) => `The value ${data} for the key ${key} already exists.`,
			SETTING_GATEWAY_SPECIFY_VALUE: 'You must specify the value to add or filter.',
			SETTING_GATEWAY_KEY_NOT_ARRAY: (key) => `The key ${key} is not an Array.`,
			SETTING_GATEWAY_KEY_NOEXT: (key) => `The key ${key} does not exist in the current data schema.`,
			SETTING_GATEWAY_INVALID_TYPE: 'The type parameter must be either add or remove.',
			SETTING_GATEWAY_INVALID_FILTERED_VALUE: (piece, value) => `${piece.key} doesn't accept the value: ${value}`,
			RESOLVER_MULTI_TOO_FEW: (name, min = 1) => `Provided too few ${name}s. At least ${min} ${min === 1 ? 'is' : 'are'} required.`,
			RESOLVER_INVALID_BOOL: (name) => `${name} must be true or false.`,
			RESOLVER_INVALID_CHANNEL: (name) => `${name} must be a channel tag or valid channel id.`,
			RESOLVER_INVALID_CUSTOM: (name, type) => `${name} must be a valid ${type}.`,
			RESOLVER_INVALID_DATE: (name) => `${name} must be a valid date.`,
			RESOLVER_INVALID_DURATION: (name) => `${name} must be a valid duration string.`,
			RESOLVER_INVALID_EMOJI: (name) => `${name} must be a custom emoji tag or valid emoji id.`,
			RESOLVER_INVALID_FLOAT: (name) => `${name} must be a valid number.`,
			RESOLVER_INVALID_GUILD: (name) => `${name} must be a valid guild id.`,
			RESOLVER_INVALID_INT: (name) => `${name} must be an integer.`,
			RESOLVER_INVALID_LITERAL: (name) => `Your option did not match the only possibility: ${name}`,
			RESOLVER_INVALID_MEMBER: (name) => `${name} must be a mention or valid user id.`,
			RESOLVER_INVALID_MESSAGE: (name) => `${name} must be a valid message id.`,
			RESOLVER_INVALID_PIECE: (name, piece) => `${name} must be a valid ${piece} name.`,
			RESOLVER_INVALID_REGEX_MATCH: (name, pattern) => `${name} must follow this regex pattern \`${pattern}\`.`,
			RESOLVER_INVALID_ROLE: (name) => `${name} must be a role mention or role id.`,
			RESOLVER_INVALID_STRING: (name) => `${name} must be a valid string.`,
			RESOLVER_INVALID_TIME: (name) => `${name} must be a valid duration or date string.`,
			RESOLVER_INVALID_URL: (name) => `${name} must be a valid url.`,
			RESOLVER_INVALID_USER: (name) => `${name} must be a mention or valid user id.`,
			RESOLVER_STRING_SUFFIX: ' characters',
			REACTIONHANDLER_PROMPT: 'Which page would you like to jump to?',
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPROMPT: (tag, error, time, abortOptions) => `${tag} | **${error}** | You have **${time}** seconds to respond to this prompt with a valid argument. Type **${abortOptions.join('**, **')}** to abort this prompt.`,
			// eslint-disable-next-line max-len
			MONITOR_COMMAND_HANDLER_REPEATING_REPROMPT: (tag, name, time, cancelOptions) => `${tag} | **${name}** is a repeating argument | You have **${time}** seconds to respond to this prompt with additional valid arguments. Type **${cancelOptions.join('**, **')}** to cancel this prompt.`,
			MONITOR_COMMAND_HANDLER_ABORTED: 'Aborted',
			INHIBITOR_MISSING_BOT_PERMS: (missing) => `Insufficient permissions, missing: **${missing}**`,
			INHIBITOR_REQUIRED_SETTINGS: (settings) => `The guild is missing the **${settings.join(', ')}** guild setting${settings.length !== 1 ? 's' : ''} and thus the command cannot run.`,
			INHIBITOR_RUNIN: (types) => `This command is only available in ${types} channels.`,
			INHIBITOR_RUNIN_NONE: (name) => `The ${name} command is not configured to run in any channel.`,
			COMMAND_BLACKLIST_DESCRIPTION: 'Blacklists or un-blacklists users and guilds from the bot.',
			COMMAND_BLACKLIST_SUCCESS: (usersAdded, usersRemoved, guildsAdded, guildsRemoved) => [
				usersAdded.length ? `**Users Added**\n${util.codeBlock('', usersAdded.join(', '))}` : '',
				usersRemoved.length ? `**Users Removed**\n${util.codeBlock('', usersRemoved.join(', '))}` : '',
				guildsAdded.length ? `**Guilds Added**\n${util.codeBlock('', guildsAdded.join(', '))}` : '',
				guildsRemoved.length ? `**Guilds Removed**\n${util.codeBlock('', guildsRemoved.join(', '))}` : ''
			].filter(val => val !== '').join('\n'),
			COMMAND_EVAL_DESCRIPTION: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
			COMMAND_EVAL_EXTENDEDHELP: [
				'The eval command evaluates code as-in, any error thrown from it will be handled.',
				'It also uses the flags feature. Write --silent, --depth=number or --async to customize the output.',
				'The --silent flag will make it output nothing.',
				"The --depth flag accepts a number, for example, --depth=2, to customize util.inspect's depth.",
				'The --async flag will wrap the code into an async function where you can enjoy the use of await, however, if you want to return something, you will need the return keyword.',
				'The --showHidden flag will enable the showHidden option in util.inspect.',
				'If the output is too large, it\'ll send the output as a file, or in the console if the bot does not have the ATTACH_FILES permission.'
			].join('\n'),
			COMMAND_EVAL_ERROR: (time, output, type) => `**Error**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_OUTPUT: (time, output, type) => `**Output**:${output}\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDFILE: (time, type) => `Output was too long... sent the result as a file.\n**Type**:${type}\n${time}`,
			COMMAND_EVAL_SENDCONSOLE: (time, type) => `Output was too long... sent the result to console.\n**Type**:${type}\n${time}`,
			COMMAND_RELOAD: (type, name, time) => `✅ Reloaded ${type}: ${name}. (Took: ${time})`,
			COMMAND_RELOAD_FAILED: (type, name) => `❌ Failed to reload ${type}: ${name}. Please check your Console.`,
			COMMAND_RELOAD_ALL: (type, time) => `✅ Reloaded all ${type}. (Took: ${time})`,
			COMMAND_RELOAD_EVERYTHING: (time) => `✅ Reloaded everything. (Took: ${time})`,
			COMMAND_RELOAD_DESCRIPTION: 'Reloads a klasa piece, or all pieces of a klasa store.',
			COMMAND_REBOOT: 'Rebooting...',
			COMMAND_REBOOT_DESCRIPTION: 'Reboots the bot.',
			COMMAND_ENABLE: (type, name) => `+ Successfully enabled ${type}: ${name}`,
			COMMAND_ENABLE_DESCRIPTION: 'Re-enables or temporarily enables a command/inhibitor/monitor/finalizer. Default state restored on reboot.',
			COMMAND_DISABLE: (type, name) => `+ Successfully disabled ${type}: ${name}`,
			COMMAND_DISABLE_DESCRIPTION: 'Re-disables or temporarily disables a command/inhibitor/monitor/finalizer/event. Default state restored on reboot.',
			COMMAND_DISABLE_WARN: 'You probably don\'t want to disable that, since you wouldn\'t be able to run any command to enable it again',
			COMMAND_CONF_NOKEY: 'You must provide a key',
			COMMAND_CONF_NOVALUE: 'You must provide a value',
			COMMAND_CONF_GUARDED: (name) => `${util.toTitleCase(name)} may not be disabled.`,
			COMMAND_CONF_UPDATED: (key, response) => `Successfully updated the key **${key}**: \`${response}\``,
			COMMAND_CONF_KEY_NOT_ARRAY: 'This key is not array type. Use the action \'reset\' instead.',
			COMMAND_CONF_GET_NOEXT: (key) => `The key **${key}** does not seem to exist.`,
			COMMAND_CONF_GET: (key, value) => `The value for the key **${key}** is: \`${value}\``,
			COMMAND_CONF_RESET: (key, response) => `The key **${key}** has been reset to: \`${response}\``,
			COMMAND_CONF_NOCHANGE: (key) => `The value for **${key}** was already that value.`,
			COMMAND_CONF_SERVER_DESCRIPTION: 'Define per-guild settings.',
			COMMAND_CONF_SERVER: (key, list) => `**Guild Settings${key}**\n${list}`,
			MESSAGE_PROMPT_TIMEOUT: 'The prompt has timed out.',
			TEXT_PROMPT_ABORT_OPTIONS: ['abort', 'stop', 'cancel'],

			/*
			 * Arguments and Utilities. Note: All of these should utilize falseMsg as KlasaMessage 
			 * parameters aren't needed.
			 */
			USERSEARCH_FAIL: this.client.speech(falseMsg, ["func-system", "usersearch"]),
			ROLESEARCH_FAIL: this.client.speech(falseMsg, ["func-system", "rolesearch"]),
			INTEGERCHECK_NONUMBER: this.client.speech(falseMsg, ["func-system", "integercheck", "noNumber"]),
			INTEGERCHECK_FLOAT: this.client.speech(falseMsg, ["func-system", "integercheck", "float"]),
			INTEGERCHECK_FAIL: this.client.speech(falseMsg, ["func-system", "integercheck", "fail"]),
			DATACHECK_NOACCOUNT: this.client.speech(falseMsg, ["func-dataCheck", "noAccount"]),
			DATACHECK_NOUSER: this.client.speech(falseMsg, ["func-dataCheck", "noUser"]),
			DATACHECK_REVOKE: this.client.speech(falseMsg, ["func-dataCheck", "revoked"]),
			DATACHECK_LACKCREDIT: this.client.speech(falseMsg, ["func-dataCheck", "lackCredits"]),
			DATACHECK_SAMEUSER: this.client.speech(falseMsg, ["func-dataCheck", "sameUser"]),
			DATACHECK_COOLDOWN: this.client.speech(falseMsg, ["func-dataCheck", "cooldown"]),
			
			/* 
			 * Commands - Config
			 */
			SETROLE_CANTGIVE: (msg) => this.client.speech(msg, ["setrole", "highpos"]),
			SETROLE_ADDED: (msg, name) => this.client.speech(msg, ["setrole", "added"], [["-role", name]]),
			SETROLE_REMOVE: (msg, name) => this.client.speech(msg, ["setrole", "remove"], [["-role", name]]),
			STARBOARD_SHOW: (msg, sbChannel, sbEmote, sbTotal) => this.client.speech(msg, ["starboard", "list"], [["-channel", sbChannel], ["-emote", sbEmote], ["-amount", sbTotal]]),
			STARBOARD_REMOVE: (msg, target) => this.client.speech(msg, ["starboard", "remove"], [["-target", target]]),
			STARBOARD_NOITEM: (msg) => this.client.speech(msg, ["starboard", "noItem"]),
			STARBOARD_WRONGITEM: (msg) => this.client.speech(msg, ["starboard", "wrongItem"]),
			STARBOARD_SETITEM: (msg, target, item) => this.client.speech(msg, ["starboard", "set"], [["-target", target], ["-item", item]]), 
			SETPREFIX: (msg, prefix) => this.client.speech(msg, ["setprefix"], [["-editPrefix", prefix]]),

			/*
			 * Commands - General
			 */
			GIVEROLE_CANTGIVE: (msg, name) => this.client.speech(msg, ["giverole", "noAssign"], [["-name", name]]),
			GIVEROLE_NOLIST: (msg) => this.client.speech(msg, ["giverole", "noList"]),
			GIVEROLE_LIST: (msg, list) => this.client.speech(msg, ["giverole", "list"], [["-list", list.join("\n")]]), 
			GIVEROLE_ADDED: (msg, name) => this.client.speech(msg, ["giverole", "added"], [["-name", name]]),
			GIVEROLE_REMOVE: (msg, name) => this.client.speech(msg, ["giverole", "remove"], [["-name", name]]),
			CHOOSE_LACKCHOICE: (msg) => this.client.speech(msg, ["choose", "lackChoice"]),
			CHOOSE_SUCCESS: (msg, author, choice) => this.client.speech(msg, ["choose", "success"], [["-user", author], ["-result", choice]]),
			ANIME_NOTERM: (msg) => this.client.speech(msg, ["anime", "noSearch"]),
			ANIME_SEARCHERR: (msg) => this.client.speech(msg, ["anime", "searchErr"]),
			ANIME_NSFW: (msg) => this.client.speech(msg, ["anime", "nsfw"]),
			MANGA_NOTERM: (msg) => this.client.speech(msg, ["manga", "noSearch"]),
			MANGA_SEARCHERR: (msg) => this.client.speech(msg, ["manga", "searchErr"]),
			MANGA_NSFW: (msg) => this.client.speech(msg, ["manga", "nsfw"]),
			GREET_MYSELF: (msg, username) => this.client.speech(msg, ["greet", "me"], [["-param1", username]]),
			GREET_SOMEONE: (msg, username) => this.client.speech(msg, ["greet", "success"], [["-param1", username]]),
			MAL_SETPROFILE: (msg) => this.client.speech(msg, ["mal", "setProfile"]),
			MAL_REMOVEPROFILE: (msg) => this.client.speech(msg, ["mal", "removeProfile"]),
			MAL_NOTERM: (msg) => this.client.speech(msg, ["mal", "noTerm"]),
			MAL_NOUSER: (msg) => this.client.speech(msg, ["mal", "noUsername"]),
			MAL_404ERR: (msg) => this.client.speech(msg, ["MAL", "404Err"]),
			ANILIST_SETPROFILE: (msg) => this.client.speech(msg, ["anilist", "setProfile"]),
			ANILIST_REMOVEPROFILE: (msg) => this.client.speech(msg, ["anilist", "removeProfile"]),
			ANILIST_NOTERM: (msg) => this.client.speech(msg, ["anilist", "noTerm"]),
			ANILIST_NOUSER: (msg) => this.client.speech(msg, ["anilist", "noUsername"]),
			ANILIST_404ERR: (msg) => this.client.speech(msg, ["anilist", "404Err"]),

			/*
			 * Commands - Fun
			 */
			ROLL_NOZERO: (msg) => this.client.speech(msg, ["roll", "zero"]),
			ROLL_NONEGATIVE: (msg) => this.client.speech(msg, ["roll", "negative"]),
			ROLL_SUCCESS: (msg, value) => this.client.speech(msg, ["roll", "success"]).replace("-value", value),
        };
    }
};