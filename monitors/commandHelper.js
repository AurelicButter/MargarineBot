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
            break;
        case "/unflip":
            msg.delete();
            msg.channel.send("*" + msg.author.tag + "* : ┬─┬ ノ( ゜-゜ノ)"); 
            break;
        case "/lenny":
            msg.delete();
            msg.channel.send("*" + msg.author.tag + "* : ( ͡° ͜ʖ ͡°)");
            break;
    }
};
