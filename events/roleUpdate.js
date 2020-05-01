const { Event } = require("klasa");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            name: "roleUpdate",
            enabled: true,
            event: "roleUpdate"
        });
    }

    async run(oldRole, newRole) {
        if (oldRole.name === newRole.name) { return; }
        let guildSettings = oldRole.guild.settings;

        if (guildSettings.roles.name.includes(oldRole.name)) {
            await guildSettings.update("roles.name", oldRole.name);
            await guildSettings.update("roles.id", oldRole.id);

            await guildSettings.update("roles.name", newRole.name);
            await guildSettings.update("roles.id", newRole.id);
        }
    }
};