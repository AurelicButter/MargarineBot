exports.conf = {
    enabled: true,
    ignoreBots: false,
    ignoreSelf: false,
};
  
exports.run = (client, msg) => {
  if ((msg.content.startsWith(client.config.prefix)) && msg.channel.type === "text") {
      if ((client.config.prefix !== msg.guild.settings.prefix) && (msg.content === (client.config.prefix + "help"))) { return msg.channel.send(`Whoops! Looks like you are thinking of my default prefix. That is not the case here. Please use: ${msg.guild.settings.prefix}`); } else { return; }
  }
};
