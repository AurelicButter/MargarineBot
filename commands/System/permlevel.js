const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "permlevel",
            runIn: ["text"],
            guarded: true,
            description: "Checks your permission level."
        });
    }

    async run(msg) {
        let permLevel = 0;

        if (msg.author === this.client.owner || this.client.secondary.includes(msg.author.id)) {
            let guild = msg.guild;
            let authorLvl = msg.author === this.client.owner ? 10 : 9;
            let author = guild.members.cache.get(msg.author.id);

            if (!guild) { permLevel = 0; }
            else if (guild.owner.id === msg.author.id) { permLevel = 3; }
            else if (author.permissions.has("ADMINISTRATOR")) { permLevel = 2; }
            else if (author.roles.cache.has(guild.settings.modRole)) { permLevel = 1; }
            else { permLevel = 0; }

            let info = msg.language.get("ADDPERMS")[permLevel];
            return msg.sendLocale("PERMLEVEL_OWNER", [msg.language.get("PERMLEVEL")[authorLvl], info]);
        } 
        
        for (let i = 5; i < 8; i++) {
            let check = await msg.hasAtLeastPermissionLevel(i);
            if (check) { permLevel = i; }
        }

        msg.sendLocale("PERMLEVEL_USER", [msg.language.get("PERMLEVEL")[permLevel]]);
    }
};