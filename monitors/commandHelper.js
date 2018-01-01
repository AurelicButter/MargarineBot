exports.conf = {
    enabled: true,
    ignoreBots: false,
    ignoreSelf: false,
};
  
exports.run = (client, msg) => {
	if (msg.content === "/shrug") { 
        msg.delete();
        msg.channel.send("*" + msg.author.tag + "*: ¯\\_(ツ)_/¯"); 
    }
	if (msg.content === "/tableflip") { 
        msg.delete();
        msg.channel.send("*" + msg.author.tag + "*: (╯°□°）╯︵ ┻━┻"); 
    }
	if (msg.content === "/unflip") { 
        msg.delete();
        msg.channel.send("*" + msg.author.tag + "*: ┬─┬ ノ( ゜-゜ノ)"); 
    }
};
