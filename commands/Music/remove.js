exports.run = async (client, msg, [songID]) => {
    var handler = client.funcs.musicCheck(msg);
    if (handler === false) { return; }
    if (Number.isInteger(songID) === false) { return msg.channel.send(client.speech(msg, ["remove", "noInt"])); }

    songID = songID - 1;
    var title = handler.queue[songID].title;
    handler.queue.splice(songID, 1);
    msg.channel.send(client.speech(msg, ["remove", "success"]).replace("-title", title));
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
    usage: "[songID:int]", humanUse: "[Song number]"
};  