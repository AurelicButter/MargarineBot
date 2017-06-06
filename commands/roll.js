// Args is how many sides the dice has.

exports.run = function(client, message, args){
    var x = args;

    if (args == '' || args == null) { 
        return message.channel.send(`I am sorry. Please specify the sided die you wish to roll from.`); 
    }

    min = Math.ceil(1);
    max = Math.floor(x)
    y = Math.floor(Math.random() * (max - min + 1)) + min;

    message.channel.send(y);
}
