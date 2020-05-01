const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "setrole",
            enabled: true,
            runIn: ["text"],
            description: "Adds or removes a role from the list of user-assignable roles.",
            usage: "<role:rolesearch>",
            permissionLevel: 5,
            extendedHelp: "Roles will be added or removed automatically depending if it exists in the list."
        });
    }

    async run(msg, [role]) {
        if (role.position > msg.guild.members.cache.get(this.client.user.id).roles.highest.position) { 
            return msg.sendLocale("SETROLE_CANTGIVE", [msg]);
        }

        var added = !msg.guild.settings.roles.name.includes(role.name);

        msg.guild.settings.update("roles.name", role.name).then(() => {
            msg.guild.settings.update("roles.id", role.id);

            if (added) { return msg.sendLocale("SETROLE_ADDED", [msg, role.name]); }
            msg.sendLocale("SETROLE_REMOVE", [msg, role.name]);
        });
    }
};