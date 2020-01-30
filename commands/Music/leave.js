const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "leave",
            runIn: ["text"],
            description: "Leaves the VC that you are in."
        });
    }

    async run(msg) {
        var vcID = this.client.util.musicCheck(msg);
        if (vcID === false) { return; }

        vcID.channel.leave();
        this.client.music.delete(msg.guild.id);
        msg.channel.send(this.client.speech(msg, ["leave"], [["-channel", vcID.channel.name]]));  
    }
};