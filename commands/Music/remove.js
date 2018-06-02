exports.run = async (client, message, [songID]) => {
    const voiceChannel = message.member.voiceChannel;
    if (!message.member.voiceChannel) { return message.channel.send("You are not in the voice channel, baka! You can't spoil someone's queue behind the scenes!"); }
  
    const handler = client.queue.get(message.guild.id);
    if (!handler) { throw `Hmm... I've tried to find your list of songs but it doesn't look like you have a queue. Better add some by ${message.guild.settings.prefix}add.`; }

    if (Number.isInteger(songID) === false) { return message.channel.send("I only have songs queued in whole numbers. Come back with a whole number, will you?"); }

    songID = songID - 1;
    var title = handler.songs[songID].title;
    handler.songs.splice(songID, 1);
    message.channel.send(`${title} has been removed from the queue.`);
};
  
exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: []
};
  
exports.help = {
    name: "remove",
    description: "Removes a song from the queue.",
    usage: "[songID:int]",
};
  