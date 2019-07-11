module.exports = (msg, tag) => {
    var client = msg.client;
    if (!msg.member.voice.channelID) { 
        client.speech(msg, ["func-music", "general", "userVC"]);
        return false;
    } else if (tag !== "join") {
        if (!client.music.get(msg.guild.id)) {
            client.speech(msg, ["func-music", "general", "noQueue"]);
            return false;
        } else if (msg.member.voice.channelID !== client.music.get(msg.guild.id).channel.id) {
            client.speech(msg, ["func-music", "general", "mismatch"]);
            return false;
        } 
        
        return client.music.get(msg.guild.id);
    } 
    
    return true;
};