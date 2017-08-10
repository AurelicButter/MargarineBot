exports.run = function(client, message, args){
  args = message.content.split(" ").slice(1).join(" ");
  if(args.length < 1) { return message.reply("You need to provide a message."); }

  message.delete().catch();
  message.channel.send(args);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say"],
  permLevel: 0
};

exports.help = {
  name: "Say",
  description: "Have Margarine say a message.",
  usage: "say <message>"
};
