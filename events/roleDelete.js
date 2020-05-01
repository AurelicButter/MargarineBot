const { Event } = require("klasa");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            name: "roleDelete",
            enabled: true,
            event: "roleDelete"
        });
    }

    async run(role) {
        //Clear role from assignable role list if it's included.
        if (role.guild.settings.roles.name.includes(role.name)) {
            role.guild.settings.update("roles.name", role.name).then(() => {
                role.guild.settings.update("roles.id", role.id);
            });
        }
    }
};