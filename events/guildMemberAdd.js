module.exports = member => {
  let guild = member.guild;
  console.log(`New User: ${member.user.username}`);
  member.guild.defaultChannel.sendMessage(`${member.user.username} has joined for the first time!`);
};
