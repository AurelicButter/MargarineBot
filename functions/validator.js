const speech = require("../assets/speech.json")["intChecker"];

module.exports = async (args, callback) => {
    var credit = args.credit;
    var tag = args.tags ? args.tags : ["none"];
    var text = [];

    if (!credit) { text.push("none"); }
    else if (credit < 0) { text.push("negative"); }
    else if (credit === 0) { text.push("zero"); }
    else if (Number.isInteger(credit) === false) { text.push("noInteger"); }

    if (args.tags.length === 4) { text.push("default"); }
    else { text.push(args.tags[0]); }

    if (!text[1]) { callback({valid: true}); }
    else { 
        text = speech[text][Math.floor(Math.random() * speech[text[0]][text[1]].length)];
        callback({valid: false, message: text}); 
    }
};

exports.conf = { requiredModules: [] };

exports.help = {
  name: "validator",
  type: "functions",
  description: "Validates any credit amount.",
};