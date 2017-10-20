module.exports = (client, message, number) => {
  if (Number(number) == number) { Final = number; }
  else if (number == "e") { Final = Math.E; }
  else if (number == "pi") { Final = Math.PI; }
  else if (number.includes("sqrt")) { Final = Math.sqrt(number.slice(4)); }
  else if (number.includes("abs")) { Final = Math.abs(number.slice(3)); }
  else if (number.includes("ln")) { Final = Math.LN(number.slice(2)); }
  else if (number.includes("log")) { Final == Math.LOG(number.slice(3))}
  else { Final = null; }
  return Number(Final);
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "constantMath",
  type: "functions",
  description: "Checks a letter if it is a constant.",
};
