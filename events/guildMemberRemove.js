module.exports = member => {
    console.log(`User left: ${member.user.username}`);
    let guild = member.guild;
    member.guild.defaultChannel.sendMessage(`${member.user.username} has left the server.`);
};
