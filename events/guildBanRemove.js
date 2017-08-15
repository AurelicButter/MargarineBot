module.exports = (guild, user => {
    guild.defaultChannel.sendMessage(`${user.username} fought the ban hammer and won!`);
};
