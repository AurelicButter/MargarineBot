exports.conf = {
    enabled: true,
    ignoreBots: false,
    ignoreSelf: false,
  };
  
exports.run = (client, msg) => {
    const swearWords = ["Nigger", "nigga", "Negro", "nigger", "Nigga", "negro", "butter is a bad mod", "Butter is a bad mod",
    "fap", "Fap", "faggot", "Faggot", "ＦＡＰ"];
    if(swearWords.some(word => msg.content.includes(word)) ) {
      msg.delete();
      msg.reply(`You shouldn't have said that!`);
    }
};