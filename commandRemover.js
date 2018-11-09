const fs = require("fs");

module.exports = function() {
    var files = ["stats", "download", "info", "ping", "invite", "reboot", "help"];

    for(var x = 0; x < files.length; x++) {
        if (fs.existsSync("./node_modules/komada/src/commands/System/" + files[x] + ".js")) {
            fs.unlinkSync("./node_modules/komada/src/commands/System/" + files[x] + ".js");
        }
    }
};