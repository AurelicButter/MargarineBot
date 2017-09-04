module.exports = (data) => {
  const toRet = [];
  const names = [];

  data.forEach((o, i) => {
    const current = o.possibles[0];
    const loc = names.indexOf(current.name);
    if (o.type === "optional") {
      current.canNull = true;
    }
    if (loc >= 0) {
      throw new Error(`at field #${loc + 1} and #${i + 1}: There can't be two fields with the same name`);
    }
    names.push(current.name);

    switch (current.type) {
      case "autots":
      case "autoid":
      case "bool":
        if (current.max || current.min) {
          throw new Error(`at field #${i + 1}: The type '${current.type}'' may not have a length`);
        }
        break;
      case "timestamp":
      case "int":
      case "long":
      case "double":
      case "json":
      case "str":
      case "string":
        break;
      default:
        throw new Error(`at field #${i + 1}: The type '${current.type}' is not supported`);
    }

    toRet.push(current);
  });

  return toRet;
};
