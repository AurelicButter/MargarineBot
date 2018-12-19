module.exports = () => {
    const { version: djsVersion } = require("discord.js");
    const { version: kVersion } = require("komada");
    
    var missingDep = [];

    var nVersion = process.version.split("v")[1].split(".");
    nVersion = Number(nVersion[0] + "." + nVersion[1]);

    if (djsVersion != "12.0.0-dev") { missingDep.push("You are not using the right discord.js package! Required version: v12.0.0-dev"); }
    if (kVersion != "0.21.1") { missingDep.push("You are not using the right Komada version! Required version: v0.21.1"); }
    if (nVersion < 8.0) { missingDep.push("You are not using the right node.js version! Required version: v8.5.0+"); }

    var correctEnv = (missingDep.length > 0) ? false : true;

    if (correctEnv === false) { console.log(missingDep.join("\n")); process.exit(); }
    else { return; }
};