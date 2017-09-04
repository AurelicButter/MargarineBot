const parseTag = (tag, count) => {
  /*
    asd|asd:Number|asd:String
  */

  const literals = [];
  const types = [];
  const toRet = [];

  const members = tag.split("|");

  members.forEach((e, i) => { // i is the current bound if required for errors.
    const result = /^([a-z0-9]+)(?::([a-z0-9]+)(?:{(?:(\d+(?:\.\d+)?))?(?:,(\d+(?:\.\d+)?))?})?)?$/i.exec(e);
    // I require to modify the regex if we wan't to handle invalid types instead of defaulting them

    if (!result) { throw new Error(`at tag #${count} at bound #${i + 1}: Invalid syntax, non specific`); }

    const fill = {
      name: result[1],
      type: result[2] ? result[2].toLowerCase() : "literal",
    };

    if (result[3]) {
      if (fill.type === "literal") {
        throw new Error(`at tag #${count} at bound #${i + 1} at the type length definition (min): you cannot set a length for a literal type`);
      }

      const temp = parseFloat(result[3]);

      if ((fill.type === "string" || fill.type === "str") && temp % 1 !== 0) {
        throw new Error(`at tag #${count} at bound #${i + 1} at the type length definition (min): the string type must have an integer length`);
      }

      fill.min = temp;
    }

    if (result[4]) {
      if (fill.type === "literal") {
        throw new Error(`at tag #${count} at bound #${i + 1} at the type length definition (max): you cannot set a length for a literal type`);
      }

      const temp = parseFloat(result[4]);
      if ((fill.type === "string" || fill.type === "str") && temp % 1 !== 0) { throw new Error(`at tag #${count} at bound #${i + 1} at the type length definition (max): the string type must have an integer length`); }
      fill.max = temp;
    }

    if (fill.type === "literal") {
      if (literals.includes(fill.name)) { throw new Error(`at tag #${count} at bound #${i + 1}: there cannot be two literals with the same text.`); }

      literals.push(fill.name);
    } else if (members.length > 1) {
      if (fill.type === "string" && members.length - 1 !== i) {
        throw new Error(`at tag #${count} at bound #${i + 1}: the String type is vague, you must specify it at the last bound`);
      }
      if (types.includes(fill.type)) {
        throw new Error(`at tag #${count} at bound #${i + 1}: there cannot be two bounds with the same type (${fill.type})`);
      }
      types.push(fill.type);
    }

    toRet.push(fill);
  });

  return toRet;
};

module.exports = (command) => {
  const tags = [];
  let opened = 0;
  let current = "";
  let openReq = false;
  let last = false;
  const cmd = command.split("");
  cmd.forEach((c, i) => {
    if (last && c !== " ") {
      throw new Error(`at char #${i + 1} '${c}': there cannot be anything else after the repeat tag.`);
    }

    if (c === "<") {
      if (opened) {
        throw new Error(`at char #${i + 1} '<': you might not open a tag inside another tag.`);
      }
      if (current) {
        throw new Error(`from char #${(i + 1) - current.length} to #${i + 1} '${current}': there cannot be a literal outside a tag`);
      }
      opened++;
      openReq = true;
    } else if (c === ">") {
      if (!opened) {
        throw new Error(`at char #${i + 1} '>': invalid close tag found`);
      }
      if (!openReq) {
        throw new Error(`at char #${i + 1} '>': Invalid closure of '[${current}' with '>'`);
      }
      opened--;
      if (current) {
        tags.push({
          type: "required",
          possibles: parseTag(current, tags.length + 1),
        });
        current = "";
      } else throw new Error(`at char #${i + 1} '>': empty tag found`);
    } else if (c === "[") {
      if (opened) {
        throw new Error(`at char #${i + 1} '[': you might not open a tag inside another tag.`);
      }
      if (current) {
        throw new Error(`from char #${(i + 1) - current.length} to #${i + 1} '${current}': there cannot be a literal outside a tag`);
      }
      opened++;
      openReq = false;
    } else if (c === "]") {
      if (!opened) {
        throw new Error(`at char #${i + 1} ']': invalid close tag found`);
      }
      if (openReq) { throw new Error(`at char #${i + 1} '>': Invalid closure of '<${current}' with ']'`); }
      opened--;
      if (current === "...") {
        if (tags.length < 1) {
          throw new Error(`from char #${i - 3} to #${i} '[...]': there cannot be a loop at the begining`);
        }
        tags.push({ type: "repeat" });
        last = true;
        current = "";
      } else if (current) {
        tags.push({
          type: "optional",
          possibles: parseTag(current, tags.length + 1),
        });
        current = "";
      } else throw new Error(`at char #${i + 1} ']': empty tag found`);
    } else if (c === " ") {
      if (opened) { throw new Error(`at char #${i + 1}: spaces aren't allowed inside a tag`); }
      if (current) {
        throw new Error(`from char #${(i + 1) - current.length} to char #${i} '${current}': there cannot be a literal outside a tag.`);
      }
    } else current += c;
  });

  if (opened) {
    throw new Error(`from char #${command.length - current.length} '${cmd[command.length - current.length - 1]}' to end: a tag was left open`);
  }

  if (current) {
    throw new Error(`from char #${(command.length + 1) - current.length} to end '${current}' a literal was found outside a tag.`);
  }

  return tags;
};
