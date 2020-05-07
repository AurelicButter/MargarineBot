const { Argument } = require("klasa");
const integerRegex = /^\d{1,}$/;

/* Possible detection:
 * 13 [True]
 * 42.5 [False]
 * "Hello world" [False]
 */

module.exports = class extends Argument {
    constructor(...args) {
        super(...args, { aliases: ["integercheck", "intcheck"] });
    }

    async run(arg, possible, msg) {
        const { min, max } = possible;
        var numArg = Number(arg);
        
        if (min > numArg) { throw msg.language.get("RESOLVER_MINMAX_MIN", possible.name, min); }
        if (max < numArg) { throw msg.language.get("RESOLVER_MINMAX_MAX", possible.name, max); }

        if (Number.isInteger(numArg)) { return numArg; }

        if (Number.isNaN(numArg)) { throw msg.language.get("INTEGERCHECK_NONUMBER"); }
        if (!integerRegex.test(numArg)) { throw msg.language.get("INTEGERCHECK_FLOAT"); }
        throw msg.language.get("INTEGERCHECK_FAIL");
    }
};