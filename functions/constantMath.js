module.exports = (client, message, number) => {
  if (number === "e") { number = Math.E; }
  else if (number === "pi") { number = Math.PI; }
  else if (number.includes("sqrt")) { number = Math.sqrt(number.slice(4)); }
  else if (number.includes("abs")) { number = Math.abs(number.slice(3)); }
  else if (number.includes("ln")) { number = Math.LN(number.slice(2)); }
  else if (number.includes("log")) { number = Math.LOG(number.slice(3)); }
  else { number = null; }
  /*
    Math.LOG2E    // returns base 2 logarithm of E
    Math.LOG10E   // returns base 10 logarithm of E

    acos(x)	Returns the arccosine of x, in radians
    asin(x)	Returns the arcsine of x, in radians
    atan(x)	Returns the arctangent of x as a numeric value between -PI/2 and PI/2 radians
    atan2(y, x)	Returns the arctangent of the quotient of its arguments
    cos(x)	Returns the cosine of x (x is in radians)
    exp(x)	Returns the value of Ex
    log(x)	Returns the natural logarithm (base E) of x
    max(x, y, z, ..., n)	Returns the number with the highest value
    min(x, y, z, ..., n)	Returns the number with the lowest value
    pow(x, y)	Returns the value of x to the power of y
    sin(x)	Returns the sine of x (x is in radians)
    tan(x)	Returns the tangent of an angle */
  return Number(number);
};

module.exports.conf = { requiredModules: [] };

module.exports.help = {
  name: "constantMath",
  type: "functions",
  description: "Checks a letter if it is a constant.",
};