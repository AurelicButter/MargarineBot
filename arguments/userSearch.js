const { Argument, util: { regExpEsc } } = require("klasa");
const IDRegex = /^((<@!)|())(\d{17,21})((>)|())$/;

/* Possible user detection:
 * <@!303236614623068161> (Mention)
 * 303236614623068161 (User ID)
 * Butterstroke (Username)
 * Butter (Guild nickname)
 */

module.exports = class extends Argument {
    constructor(...args) {
        super(...args, { aliases: ["usersearch"] });
    }

    async run(arg, possible, msg) {
        if (arg === undefined) { return msg.author; }
        if (IDRegex.test(arg)) { return this.client.users.cache.get(/(\d{17,21})/.exec(arg)[0]); } 

        var results = [];

        if (msg.guild) {
            var regex = new RegExp(regExpEsc(arg), "i");
            results = msg.guild.members.cache.filter(m => regex.test(m.user.username));
        }

        if (results.size === 0) { throw msg.language.get("USERSEARCH_FAIL"); }

        return this.client.users.cache.get(results.keys().next().value);
    }
};