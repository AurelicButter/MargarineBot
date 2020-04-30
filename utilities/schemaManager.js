/**
 * Initializes all settings needed for the schemas.
 * @param { KlasaClient } client - The bot instance of the client.
 */
module.exports = function(client) {
    client.gateways.guilds.schema //Add all configurable settings
        .add("modRole", "role")
        .add("muteRole", "role")
        .add("langSpeech", "language", { default: "en-CA" })
        .add("defaultChannel", "channel")
        .add("modlog", "channel")
        .add("starboard", folder => folder
            .add("channel", "TextChannel")
            .add("emote", "string", { default: "⭐"})
            .add("requiredAmount", "Integer", { default: 5, min: 1 }) 
            .add("msgCache", "string", { array: true, configurable: false }) //Linked with sbCache. Indexes are linked as a sudo-relation.
            .add("sbCache", "string", { array: true, configurable: false })   
        )
        .add("roles", folder => folder
            .add("name", "string", { array: true, configurable: false }) //Linked with id. Indexes are linked as a sudo-relation
            .add("id", "string", { array: true, configurable: false })
        );
};