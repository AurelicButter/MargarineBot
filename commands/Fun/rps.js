exports.run = async (client, msg, [choice, user]) => {
    if (!user) { user = client.user.id; }
    client.funcs.userSearch(client, msg, user).then(data => {
        if (data !== false) {
            if (data.user.id === msg.author.id) { return msg.channel.send(client.speech(msg, ["rps", "sameUser"])); }

            var types = ["rock", "paper", "scissors"];
            var hand = types[Math.floor(Math.random() * (Math.floor(2) - Math.ceil(1) + 1)) + Math.ceil(1)];  
            
            if ((choice === "rock" && hand === "scissors") || (choice === "paper" && hand === "rock") || (choice === "scissors" && hand === "paper")) { var result = `${msg.author.username} wins`; } 
            else if ((choice === "rock" && hand === "paper") || (choice === "paper" && hand === "scissors") || (choice === "scissors" && hand === "rock")) { var result = `${data.user.username} wins`; }
            else { var result = "Draw"; }

            msg.channel.send(
                client.speech(msg, ["rps", "success"])
                    .replace("-user1", msg.author.username)
                    .replace("-user2", data.user.username)
                    .replace("-hand1", choice)
                    .replace("-hand2", hand)
                    .replace("-result", result)
            );
        }
    });
};
    
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["rockpaperscissors"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: ["userSearch"]
};
    
exports.help = {
    name: "rps",
    description: "Play Rock, Paper, Scissors!",
    usage: "<paper|scissors|rock> [user:str]",
    usageDelim: " ",
    humanUse: "(paper|scissors|rock)_(user)"
};