const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "giverole",
            enabled: true,
            runIn: ["text"],
            description: "Get a role or remove it if you already have it.",
            usage: "[list|role:str]",
            extendedHelp: "If no argument is provided, the command will default to display the list of assignable roles."
        });

        this.humanUse = "[list|role]";
    }

    async run(msg, [role="list"]) {
        if (role === "list") { return msg.sendLocale("GIVEROLE_LIST", [msg, msg.guild.settings.roles.name]); }

        let user = msg.guild.members.cache.get(msg.author.id);
        var roleIndex = msg.guild.settings.roles.name.findIndex(item => item.toLowerCase() === role.toLowerCase());
        if (roleIndex === -1) { return msg.sendLocale("GIVEROLE_CANTGIVE", [msg, role]); }

        var role = msg.guild.roles.cache.get(msg.guild.settings.roles.id[roleIndex]);

        if (user.roles.cache.get(role.id)) {
            user.roles.remove(role.id, "Automated Action - User requested via command.");
            return msg.sendLocale("GIVEROLE_REMOVE", [msg, role.name]);
        }

        user.roles.add(role.id, "Automated Action - User requested via command.");
        msg.sendLocale("GIVEROLE_ADDED", [msg, role.name]);
    }
};