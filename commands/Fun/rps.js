exports.run = async (client, message, [user]) => {  
    if (!user) { user = client.user; } 
    else {
        user = client.funcs.userSearch(client, message, user);
        if (user.username === null) { return; }  
    }

    var types = ["rock", "paper", "scissors"];

    var hand1 = types[Math.floor(Math.random() * (Math.floor(2) - Math.ceil(1) + 1)) + Math.ceil(1)];
    var hand2 = types[Math.floor(Math.random() * (Math.floor(2) - Math.ceil(1) + 1)) + Math.ceil(1)];

    if (hand1 === "rock" && hand2 === "scissors") {
        return message.channel.send(`${message.author.username} plays ${hand1}! ${user.username} plays ${hand2}! **${message.author.username} wins!**`);
    } if (hand1 === "paper" && hand2 === "rock") {
        return message.channel.send(`${message.author.username} plays ${hand1}! ${user.username} plays ${hand2}! **${message.author.username} wins!**`);
    } if (hand1 === "scissors" && hand2 === "paper") {
        return message.channel.send(`${message.author.username} plays ${hand1}! ${user.username} plays ${hand2}! **${message.author.username} wins!**`);
    } 
    
    if (hand1 === "rock" && hand2 === "paper") {
        return message.channel.send(`${message.author.username} plays ${hand1}! ${user.username} plays ${hand2}! **${user.username} wins!**`);
    } if (hand1 === "paper" && hand2 === "scissors") {
        return message.channel.send(`${message.author.username} plays ${hand1}! ${user.username} plays ${hand2}! **${user.username} wins!**`);
    } if (hand1 === "scissors" && hand2 === "rock") {
        return message.channel.send(`${message.author.username} plays ${hand1}! ${user.username} plays ${hand2}! **${user.username} wins!**`);
    }

    if (hand1 === hand2) { return message.channel.send(`${message.author.username} plays ${hand1}! ${user.username} plays ${hand2}! **Draw!**`); }
};
    
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
    
exports.help = {
    name: "rps",
    description: "Play Rock, Paper, Scissors with someone or Margarine!",
    usage: "[user:str]",
    usageDelim: "",
};
