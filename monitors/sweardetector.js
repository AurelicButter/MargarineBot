exports.conf = {
  enabled: true,
  ignoreBots: false,
  ignoreSelf: false,
};

exports.run = (client, message) => {
    const swearWords = [/* Insert swearwords in here */];
    var message = message.content.toLowerCase();
    if(swearWords.some(word => message.includes(word)) || swearWords.some(word => message.content.includes(word))) {
        message.delete();
        message.reply(`You shouldn't have said that!`);
    }
};
