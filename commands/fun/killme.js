exports.run = function(client, message) {
    let person = message.author.username
    message.channel.send(`${person} has died.`)
    .then(message => {
        setTimeout(() => { message.edit("Respawning..."); }, 1000);
        setTimeout(() => { message.edit(`Revival complete. Welcome back, ${person}`); }, 1000)
    });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["kms"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};
      
exports.help = {
    name: "killme",
    description: "Kill yourself with this command. Now comes with free revival!",
    usage: "",
    usageDelim: "",
};