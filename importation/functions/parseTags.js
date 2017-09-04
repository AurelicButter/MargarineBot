class ParserError {
  constructor(message, type, start, content, end) {
    this.message = message;
    this.type = type;
    this.start = start;
    this.content = content;
    this.end = end;
  }

  toString() {
    let ret = "Error";
    if (this.start) {
      if (this.end !== undefined) {
        ret += ` from ${this.type} #${this.end} to ${this.type} #${this.start}`;
      } else {
        ret += ` at ${this.type} #${this.start}`;
      }
    }

    if (this.content) {
      ret += ` '${this.content}'`;
    }
    ret += `: ${this.message}`;
    return ret;
  }
}

const alphaNumeric = /^[a-zA-Z0-9]+$/;

const parseTagData = (data, disallow, tag) => {
  const toRet = [];
  const types = [];

  const possiblilies = data.split("|");

  if (disallow && possiblilies.length > 1) { // Remove this in case you want posibilities
    throw new ParserError("There can't be a more than one posibility in the tag", "tag", tag);
  }
  possiblilies.forEach((p, i) => {
    const bounds = p.split(":", 3);

    if (bounds.length > 2) {
      throw new ParserError("Invalid syntax, found at least two ':' inside the same posibility", "tag(possibility)", `${tag}(${i + 1})`);
    }
    if (!bounds[0]) {
      throw new ParserError("The tag name must not be empty", "tag(possibility)", `${tag}(${i + 1})`);
    }
    if (disallow && !alphaNumeric.test(bounds[0])) {
      throw new ParserError("The name must be alpha-numeric", "tag(possibility)", `${tag}(${i + 1})`);
    }
    const bound = {
      name: bounds[0],
      type: disallow ? "string" : "literal",
    };

    if (bounds[1]) {
      let opened = false;
      let second = false;
      let mustEnd = false;
      let current = "";

      bounds[1].split("").forEach((c) => {
        switch (c) {
          case "{":
            opened = true;
            if (!current && !disallow) {
              throw new ParserError("You canno't specify the length of a literal", "tag(possibility)", `${tag}(${i + 1})`);
            }
            if (current) {
              bound.type = current.toLowerCase();
            }
            current = "";
            break;
          case "}":
            if (!current) {
              throw new ParserError("The length definition might not be empty", "tag(possibility)", `${tag}(${i + 1})`);
            }

            if (second) {
              bound.max = parseFloat(current);
            } else if (bound.min === undefined) {
              bound.min = parseFloat(current);
            }
            current = "";
            mustEnd = true;
            opened = false;
            break;
          case ",":
            if (!opened) {
              throw new ParserError("Unexpected character ',' at this point", "tag(possibility)", `${tag}(${i + 1})`);
            }
            if (second) {
              throw new ParserError("Found character ',' two or more times inside the length definition", "tag(possibility)", `${tag}(${i + 1})`);
            }
            if (current) {
              try {
                bound.min = parseFloat(current);
              } catch (e) {
                throw new Error("");
              }
              current = "";
            }
            second = true;
            break;
          case ".":
            if (!opened) {
              throw new ParserError("Unexpected character '.' at this point", "tag(possibility)", `${tag}(${i + 1})`);
            }
            current += c;
            break;
          default:
            if (opened && isNaN(c)) {
              throw new ParserError("there're only numbers allowed to define the length", "tag(possibility)", `${tag}(${i + 1}) in the length definition`);
            }
            if (mustEnd) {
              throw new ParserError("Invalid syntax, expected an end after the length", "tag(possibility)", `${tag}(${i + 1}) in the length definition`);
            }
            current += c;
            break;
        }
      });

      if (opened) {
        throw new ParserError("unclosed '{' found", "tag(possibility)", `${tag}(${i + 1})`);
      }

      if (types.includes(bound.type)) {
        throw new ParserError("Two bounds with the same type has been found in the same tag", "tag", `${tag}`);
      }

      if (types.includes("string")) {
        throw new ParserError("String type is vague, must be defined at the end of possiblilies", "tag", `${tag}`);
      }

      if (["string", "str"].includes(bound.type)) {
        if ((bound.max && bound.max % 1 !== 0) || (bound.min && bound.min % 1 !== 0)) {
          throw new ParserError("String types may have an integer length", "tag(possibility)", `${tag}(${i + 1}) in the length definition`);
        }
      }

      if (bound.max && bound.min && bound.min > bound.max) {
        throw new ParserError("The max cannot be lower than the min", "tag(possibility)", `${tag}(${i + 1}) in the length definition`);
      }

      if (!alphaNumeric.test(bound.type)) {
        throw new ParserError("The type must be alpha-numeric", "tag(possibility)", `${tag}(${i + 1}) in the length definition`);
      }

      if (current) {
        bound.type = current.toLowerCase();
      }
    }

    toRet.push(bound);
    types.push(bound.type);
  });

  return toRet;
};

module.exports = (command, disallowCharacters) => {
  /** *
   parseTags("[asda:asd{1.5,2.2}] <Bar> [asd] [...]").then(tags => console.log(util.inspect(tags, false, null))).catch(e => console.log(e + ""));
  ***/
  let opened;
  let current = "";
  const tags = [];
  let closed = false;
  command.split("").forEach((c, i) => {
    switch (c) {
      case "<":
      case "[":
        if (closed) {
          throw new ParserError("You can't open another tag once a loop tag was set", "char", i + 1, c);
        }
        if (opened) {
          throw new ParserError("You cannot open a tag inside another tag", "char", i + 1, c);
        }
        if (current) {
          throw new ParserError("There can't be literals outside a tag", "char", i + 1, current, (i + 1) - current.length);
        }
        opened = c;
        break;
      case ">":
      case "]":

        if (!opened) {
          throw new ParserError("Invalid tag closure, no tag was open", "char", i + 1, c);
        }

        if (!current) {
          throw new ParserError("An empty tag was found", "char", i + 1, opened + c, i);
        }

        if ((c === ">" && opened !== "<") || (c === "]" && opened !== "[")) {
          throw new ParserError(`Invalid closure of '${opened}' with '${c}'`, "char", i + 1, opened + current + c, i - current.length);
        }
        if (current === "..." && opened === "[" && !disallowCharacters) {
          if (tags.length === 0) {
            throw new ParserError("You cannot specify a loop tag in the begining", "tag", tags.length + 1);
          }

          tags.push({
            type: "loop",
          });

          // tags[tags.length -1].loop = true;

          closed = true;
        } else {
          tags.push({
            type: c === ">" ? "required" : "optional",
            possibles: parseTagData(current, disallowCharacters, tags.length + 1),
          });
        }

        current = "";
        opened = null;
        break;
      case "\n":
        throw new ParserError("New lines are not allowed!");
      case " ":
        break;
      default:
        current += c;
        break;
    }
  });
  return tags;
};
