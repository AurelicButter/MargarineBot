module.exports = (guild) => {
    console.log(`I have started working for ${guild.name} at ${new Date()}`);
    guild.defaultChannel.send("Hello! I am Margarine!");
    guild.defaultChannel.send("I will be a bot user on here so feel free to use me when I am online!");
};
