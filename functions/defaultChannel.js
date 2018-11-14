module.exports = (client, guild, args) => {
    if (!args) { args == "default"; }
    var channelID = schemaCheck(client, args);

    if (channelID == false) {
        channelID = locate(Array.from(guild.channels), ["general", "general-chat", "off-topic"]);
        if (channelID == false) {
            var channels = Array.from(guild.channels.sort((e1, e2) => e1.rawPosition - e2.rawPosition));
            for (var x = 0; x < channels.length; x++) {
                var currChannel = channels[x][1];
                if (currChannel.type == "text" && currChannel.permissionsFor(guild.members.get(client.user.id)).has("SEND_MESSAGES")) { 
                    channelID = currChannel.id; 
                    x = channels.length;
                }
            }
        }
    }

    return guild.channels.get(channelID);
};
  
function schemaCheck(client, schema, args) {
    var schema = client.settings.guilds.schema;
    if(!schema.defaultChannel || !schema.modlog) { client.funcs.confAdd(client); }
    
    if(schema.defaultChannel != null && args == "default") { return schema.defaultChannel; }
    else if(schema.modlog != null && args == "mod") { return schema.modlog; }
    else { return false; }
};

function locate(cList, name) {
    var channelList = Array.from(cList);
    for (var x = 0; x < channelList.length; x++) {
        if (name.includes(channelList[x][1].name)) { x = channelList.length; return channelList[x][1].id; }
        if (x + 1 == channelList.length) { return false; }
    }
};