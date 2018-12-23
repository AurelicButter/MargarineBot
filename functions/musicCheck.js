module.exports = (msg, tag) => {
    var result, speech;
    var client = msg.client;
    if (!msg.member.voice.channelID) { 
        result = false;
        speech = client.speech(msg, ["func-music", "general", "userVC"]);
    } else if (tag !== "join") {
        if (!client.music.get(msg.guild.id)) {
            result = false;
            speech = client.speech(msg, ["func-music", "general", "noQueue"]);
        } else if (msg.member.voice.channelID !== client.music.get(msg.guild.id).channel.id) {
            result = false;
            speech = client.speech(msg, ["func-music", "general", "mismatch"]);
        } else { result = client.music.get(msg.guild.id); }
    } else { result = true; }
    
    if(speech) { msg.channel.send(speech); }
    return result;
};