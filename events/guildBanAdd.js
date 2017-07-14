module.exports = (guild, user) => {
    guild.defaultChannel.sendMessage(`${user.username} was banned!`);
    guild.defaultChannel.sendMessage('Glory to the hammer!');
};