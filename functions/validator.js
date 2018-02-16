const speech = require("../assets/values/speech.json")["intChecker"];

module.exports = async (credit, callback) => {
    var text;
    if (!credit) { text === "none"; }
    else if (credit < 0) { text === "negative"; }
    else if (credit === 0) { text === "zero"; }
    else if (Number.isInteger(credit) === false) { text === "noInteger"; }

    if (!text) { callback({valid: true}); }
    else { 
        text = speech[text][Math.floor(Math.random() * speech[text].length)];
        callback({valid: false, message: text}); 
    }
};

exports.conf = { requiredModules: [] };

exports.help = {
  name: "validator",
  type: "functions",
  description: "Validates any credit amount.",
};