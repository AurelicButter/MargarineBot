const { Argument } = require("klasa");

module.exports = class extends Argument {
	run(arg, possible, msg) {
        let x = 0;
        const monitorIterator = this.client.monitors.entries();
        while (x < this.client.monitors.size) {
            let currMonitor = monitorIterator.next().value;
            if (currMonitor[0].toLowerCase() === arg.toLowerCase()) {
                return currMonitor[1];
            }
        }

		throw msg.language.get("RESOLVER_INVALID_PIECE", possible.name, "monitor");
	}
};