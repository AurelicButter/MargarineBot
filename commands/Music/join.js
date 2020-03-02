const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "join",
            runIn: ["text"],
            description: "Joins the VC that you are in."
        });
    }

    async run(msg) {
        var check = this.client.util.musicCheck(msg, "join");
        if (check === false) { return; }
    
        var vcID = msg.guild.channels.cache.get(msg.member.voice.channelID);
        const permissions = vcID.permissionsFor(msg.guild.me);
        if (permissions.has("CONNECT") === false) { return msg.channel.send(this.client.speech(msg, ["join", "noConnect"])); }
        if (permissions.has("SPEAK") === false) { return msg.channel.send(this.client.speech(msg, ["join", "noSpeak"])); }

        var vcSettings = {
            channel: vcID,
            queue: [],
            volume: 100,
            state: "STOP",
            connection: null,
            dispatcher: null
        };

        vcID.join().then(connection => { vcSettings.connection = connection; });
        this.client.music.set(msg.guild.id, vcSettings);

        msg.channel.send(this.client.speech(msg, ["join", "success"], [["-param1", vcID.name]]));    
    }
};