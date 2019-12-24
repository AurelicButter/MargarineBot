module.exports = () => {
    const { version: djsVersion } = require("discord.js");
    const { version: kVersion } = require("klasa");
    
    var missingDep = [];

    var nVersion = process.version.split("v")[1].split(".");
    nVersion = Number(nVersion[0] + "." + nVersion[1]);

    if (djsVersion != "12.0.0-dev") { missingDep.push("You are not using the right discord.js package! Required version: v12.0.0-dev"); }
    if (kVersion != "0.5.0-dev") { missingDep.push("You are not using the right Klasa version! Required version: v0.5.0-dev"); }
    if (nVersion < 10.0) { missingDep.push("You are not using the right node.js version! Required version: v10.0.0+"); }

    if (missingDep.length > 0) { console.log(missingDep.join("\n")); process.exit(); }
    else { return; }
};

module.exports.help = {
    name: "envCheck",
    description: "Verifies the enviroment before running Margarine."
};