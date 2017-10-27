module.exports = (client, message, number) => {
  if (Number(number) === number) { number = number; }
  else if (number === "e") { number = Math.E; }
  else if (number === "pi") { number = Math.PI; }
  else if (number.includes("sqrt")) { number = Math.sqrt(number.slice(4)); }
  else if (number.includes("abs")) { number = Math.abs(number.slice(3)); }
  else if (number.includes("ln")) { number = Math.LN(number.slice(2)); }
  else if (number.includes("log")) { number = Math.LOG(number.slice(3)); }
  else { number = null; }
  return Number(number);
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "constantMath",
  type: "functions",
  description: "Checks a letter if it is a constant.",
};
