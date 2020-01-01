function locate(cList, name) {
    var channelList = Array.from(cList);
    for (var x = 0; x < channelList.length; x++) {
        if (name.includes(channelList[x][1].name) && channelList[x][1].type === "text") { x = channelList.length; return channelList[x][1].id; }
        if (x + 1 === channelList.length) { return false; }
    }
}

module.exports = (guild, args="default") => {
    if (guild.settings.defaultChannel !== null && args === "default") { return guild.channels.get(guild.settings.defaultChannel); }
    else if (guild.settings.modlog !== null && args === "mod") { return guild.channels.get(guild.settings.modlog); }

    var channelID = locate(Array.from(guild.channels), ["general", "general-chat", "off-topic"]);
    if (channelID === false) {
        var channels = Array.from(guild.channels.sort((e1, e2) => e1.rawPosition - e2.rawPosition));
        for (var x = 0; x < channels.length; x++) {
            var currChannel = channels[x][1];
            if (currChannel.type === "text" && currChannel.permissionsFor(guild.members.get(this.client.user.id)).has("SEND_MESSAGES")) { 
                channelID = currChannel.id; 
                x = channels.length;
            }
        }
    }

    return guild.channels.get(channelID);
};