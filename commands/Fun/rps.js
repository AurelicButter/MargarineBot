exports.run = async (client, message, [choice, user]) => {  
    client.funcs.userSearch(client, message, {user: user, name: this.help.name}, function(data) {
        if (data.valid === false) { return; }

        user = (data.user.id === message.author.id) ? client.user : data.user;
        
        var types = ["rock", "paper", "scissors"];
        var hand = types[Math.floor(Math.random() * (Math.floor(2) - Math.ceil(1) + 1)) + Math.ceil(1)];

        if ((choice === "rock" && hand === "scissors") || (choice === "paper" && hand === "rock") || (choice === "scissors" && hand === "paper")) { var result = `**${message.author.username} wins!**`; } 
        if ((choice === "rock" && hand === "paper") || (choice === "paper" && hand === "scissors") || (choice === "scissors" && hand === "rock")) { var result = `**${user.username} wins!**`; }
        if (choice === hand) { var result = "**Draw!**"; }

        message.channel.send(`${message.author.username} plays ${choice}! ${user.username} plays ${hand}! ${result}`);
    });
};
    
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"],
};
    
exports.help = {
    name: "rps",
    description: "Play Rock, Paper, Scissors!",
    usage: "<paper|scissors|rock> [user:str]",
    usageDelim: " ",
    humanUse: "(paper|scissors|rock)_(user)"
};