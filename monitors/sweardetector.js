exports.run = (client, message) => {
  const swearWords = [/* Insert swearwords in here */];
  var msg = message.content.toLowerCase();
  if(swearWords.some(word => msg.includes(word)) || swearWords.some(word => message.content.includes(word))) {
    message.delete();
    message.reply("You shouldn't have said that!");
  }
};

exports.conf = {
  enabled: false,
  ignoreBots: false,
  ignoreSelf: false,
};