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
        if (IDRegex.test(arg)) { return this.client.users.get(/(\d{17,21})/.exec(arg)[0]); } 

        var regex = new RegExp(regExpEsc(arg), "i");
        var results = msg.guild.members.filter(m => regex.test(m.user.username));

        if (results.size == 0) {
            msg.channel.send(this.client.speech(msg, ["func-userSearch", "default"]));
            return null;
        }

        return this.client.users.get(results.keys().next().value);

        //Check for bot user and if the command doesn't allow bots.
    }
}