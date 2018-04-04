const speech = require("../assets/speech.json")["intChecker"];

module.exports = async (args) => {
    var credit = args.credit;
    var tag = args.tags ? args.tags : ["none"];
    var text = [];

    if (!credit || credit === undefined) { text.push("none"); }
    else if (credit < 0) { text.push("negative"); }
    else if (credit === 0) { text.push("zero"); }
    else if (Number.isInteger(credit) === false) { text.push("noInteger"); }

    if (args.tags.length === 4) { text.push("default"); }
    else { text.push(args.tags); }

    if (!text[1]) { return {valid: true}; }
    else { 
        text = speech[text[0]][text[1]][Math.floor(Math.random() * speech[text[0]][text[1]].length)];
        return {valid: false, message: text}; 
    }
};

exports.conf = { requiredModules: [] };

exports.help = {
  name: "validator",
  type: "functions",
  description: "Validates any credit amount.",
};