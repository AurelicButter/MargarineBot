module.exports = (data, properties, values) => {
  const names = [];
  const compiled = [];
  properties.forEach((p, i) => {
    const temp = data.find(e => e.name === p);
    if (!temp) {
      throw new Error(`at property #${i + 1}: Cannot find the name '${p}' in the schema, names are case sensitive`);
    }

    const loc = names.indexOf(temp.name);
    if (loc >= 0) {
      throw new Error(`at properties #${loc + 1} and #${i + 1}: Duplicated properties found`);
    }
    names.push(temp.name);
    compiled.push(temp);
  });

  if (values.length !== compiled.length) {
    throw new Error("The values and properties must contain the same amount of elements");
  }

  values.forEach((v, i) => {
    const bound = compiled[i];

    if (v === null) {
      if (bound.canNull) {
        return;
      } else if (!["autots", "autoid"].includes(bound.type)) {
        throw new Error(`at value #${i + 1}: Can't be null`);
      }
    }

    switch (bound.type) {
      case "autots":
      case "autoid":
        if (v !== null) {
          throw new Error(`at value #${i + 1}: The type '${bound.type}' must not be specified, try to set it to 'null', got '${v}`);
        }
        break;
      case "bool":
        if (!["true", "false", true, false, 1, 0].includes(!!JSON.parse(v))) {
          throw new Error(`at value #${i + 1}: The 'bool' type must be 'true(1)' or 'false(0)', got '${v}`);
        }
        break;
      case "timestamp":
        try {
          if (new Date(parseInt(v)).getTime() <= 0) {
            throw new Error(null);
          }
        } catch (e) {
          throw new Error(`at value #${i + 1}: The 'timestamp' type must be a integer number and greater than zero, got '${v}'`);
        }
        break;
      case "int":
        if (isNaN(v) || v % 1 !== 0) {
          throw new Error(`at value #${i + 1}: The '${bound.type}' must be a number without decimal places, got '${v}'`);
        }
        break;
      case "double":
      case "float":
        if (isNaN(v)) { throw new Error(`at value #${i + 1}: The '${bound.type}' must be a number, got '${v}`); }
        break;
      case "json":
        JSON.parse(JSON.stringify(v));
        break;
      case "str":
      case "string":
        break;
      default:
        throw new Error("unsupported");
    }
  });
};
