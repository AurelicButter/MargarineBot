exports.conf = {
    enabled: true,
    ignoreBots: false,
    ignoreSelf: false,
};
  
exports.run = (client, message) => {
  const links = [/*Insert blacklisted links here*/];
  const Link = ["discord.gg"];
  if (links.some(word => message.content.includes(links))) {
      return;
  } else if(message.content.includes(Link)) {
    message.delete();
    message.reply("No advertising links!");
  }
};
