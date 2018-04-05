exports.run = async (client, msg, [choice, user]) => {
    if (!user) { user = client.user.id; }  
    var data = await client.funcs.userSearch(msg, {user: [null, user], name: this.help.name});
    
    if (data.valid === false) { return; }
    if (data.user[1].id === msg.author.id) { msg.channel.send("Hey! You can't play rock, paper, scissors with yourself! Invite someone into the mix or play with me instead!"); }
        
    var types = ["rock", "paper", "scissors"];
    var hand = types[Math.floor(Math.random() * (Math.floor(2) - Math.ceil(1) + 1)) + Math.ceil(1)];

    if ((choice === "rock" && hand === "scissors") || (choice === "paper" && hand === "rock") || (choice === "scissors" && hand === "paper")) { var result = `**${data.user[0].prefered} wins!**`; } 
    else if ((choice === "rock" && hand === "paper") || (choice === "paper" && hand === "scissors") || (choice === "scissors" && hand === "rock")) { var result = `**${data.user[1].prefered} wins!**`; }
    else { var result = "**Draw!**"; }

    msg.channel.send(`${data.user[0].prefered} plays ${choice}! ${data.user[1].prefered} plays ${hand}! ${result}`);
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