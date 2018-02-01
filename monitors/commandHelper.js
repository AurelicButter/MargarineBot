exports.conf = {
    enabled: true,
    ignoreBots: false,
    ignoreSelf: false,
};
  
exports.run = (client, msg) => {
    switch (msg.content) {
        case "/shrug":
            msg.delete();
            msg.channel.send("*" + msg.author.tag + "* : ¯\\_(ツ)_/¯"); 
            break;
        case "/tableflip":
            msg.delete();
            msg.channel.send("*" + msg.author.tag + "* : (╯°□°）╯︵ ┻━┻"); 
        case "/unflip":
            msg.delete();
            msg.channel.send("*" + msg.author.tag + "* : ┬─┬ ノ( ゜-゜ノ)"); 
        case "/lenny":
            msg.delete();
            msg.channel.send("*" + msg.author.tag + "* : ( ͡° ͜ʖ ͡°)")
    }
};
