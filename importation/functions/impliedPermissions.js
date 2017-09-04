const permFlags = require("discord.js/src/util/Constants.js").PermissionFlags;

module.exports = () => {
  const genObject = {};

  for (const key in permFlags) { genObject[key] = false; }

  genObject.READ_MESSAGES = true;
  genObject.SEND_MESSAGES = true;
  genObject.SEND_TTS_MESSAGES = true;
  genObject.EMBED_LINKS = true;
  genObject.ATTACH_FILES = true;
  genObject.READ_MESSAGE_HISTORY = true;
  genObject.MENTION_EVERYONE = true;
  genObject.EXTERNAL_EMOJIS = true;

  return genObject;
};
