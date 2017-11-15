exports.run = async (client, message, [choice, user]) => {  
    if (!user) { user = client.user; } 
    else {
        user = client.funcs.userSearch(client, message, user);
        if (user.username === null) { return; }  
    }

    var types = ["rock", "paper", "scissors"];
    var hand = types[Math.floor(Math.random() * (Math.floor(2) - Math.ceil(1) + 1)) + Math.ceil(1)];

    if (choice === "rock" && hand === "scissors") {
        return message.channel.send(`${message.author.username} plays ${choice}! ${user.username} plays ${hand}! **${message.author.username} wins!**`);
    } if (choice === "paper" && hand === "rock") {
        return message.channel.send(`${message.author.username} plays ${choice}! ${user.username} plays ${hand}! **${message.author.username} wins!**`);
    } if (choice === "scissors" && hand === "paper") {
        return message.channel.send(`${message.author.username} plays ${choice}! ${user.username} plays ${hand}! **${message.author.username} wins!**`);
    } 
    
    if (choice === "rock" && hand === "paper") {
        return message.channel.send(`${message.author.username} plays ${choice}! ${user.username} plays ${hand}! **${user.username} wins!**`);
    } if (choice === "paper" && hand === "scissors") {
        return message.channel.send(`${message.author.username} plays ${choice}! ${user.username} plays ${hand}! **${user.username} wins!**`);
    } if (choice === "scissors" && hand === "rock") {
        return message.channel.send(`${message.author.username} plays ${choice}! ${user.username} plays ${hand}! **${user.username} wins!**`);
    }

    if (choice === hand) { return message.channel.send(`${message.author.username} plays ${choice}! ${user.username} plays ${hand}! **Draw!**`); }
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
    usage: "<paper|scissors|rock> [user:str]",
    usageDelim: "",
};