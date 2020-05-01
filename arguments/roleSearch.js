const { Argument } = require("klasa");
const IDRegex = /^((<@&)|())(\d{17,21})((>)|())$/;

/* Possible role detection:
 * <@&662772689286594570> (Mention)
 * 662772689286594570 (Role ID)
 * Margarine (Role name)
 */

module.exports = class extends Argument {
    constructor(...args) {
        super(...args, { aliases: ["rolesearch"] });
    }

    async run(arg, possible, msg) { 
        if (arg === undefined || !msg.guild) { throw msg.language.get("ROLESEARCH_FAIL", msg); }
        if (IDRegex.test(arg)) { return msg.guild.roles.cache.get(/(\d{17,21})/.exec(arg)[0]); } 

        var results = msg.guild.roles.cache.filter(m => m.name === arg || m.name.toLowerCase() === arg.toLowerCase());
        if (results.size === 0) { throw msg.language.get("ROLESEARCH_FAIL", msg); }

        return msg.guild.roles.cache.get(results.keys().next().value);
    }
};