const moment = require("moment")

exports.run = function(client, message, args) {
    let messagecount = parseInt(args.join(" "));
	let guild = message.guild.name;
	
    message.channel.fetchMessages({
        limit: messagecount
    }).then(messages => {
		message.channel.bulkDelete(messages);
		message.reply(`Purged ${messagecount} messages from the channel, ${message.author.username}.`);
		console.log(`[${moment().format('YYYY-MM-DD HH:mm')}] ${message.author.username} has purged ${messagecount} messages from ${guild}`);
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["purge"],
  permLevel: 2
};

exports.help = {
  name: "Purge",
  description: "Purges X amount of messages from a given channel.",
  usage: "purge <number>"
};
