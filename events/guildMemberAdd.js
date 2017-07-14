module.exports = member => {
  let guild = member.guild;
  console.log(`New User: ${member.user.username}`);
  member.guild.defaultChannel.send(`${member.user.username} is buttered up and has joined for the first time!`);
};