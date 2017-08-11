exports.run = function(client, message){
  let start = message.createdTimestamp;
  message.channel.send("Pinging...")
    .then(message => {
      message.edit(`🎉 Pong! (Took: ${message.createdTimestamp - start}ms) 🎉`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ping"],
  permLevel: 0
};

exports.help = {
  name: "Ping",
  description: "Ping/Pong command.",
  usage: "ping"
};
