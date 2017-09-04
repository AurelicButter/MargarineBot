function sensitivePattern(client) {
  if (!this.sensitivePattern) {
    let pattern = "";
    if (client.token) pattern += client.token;
    if (client.token) pattern += (pattern.length > 0 ? "|" : "") + client.token;
    if (client.user.email) pattern += (pattern.length > 0 ? "|" : "") + client.user.email;
    if (client.password) pattern += (pattern.length > 0 ? "|" : "") + client.password;
    this.sensitivePattern = new RegExp(pattern, "gi");
  }
  return this.sensitivePattern;
}

module.exports = (client, text) => {
  if (typeof (text) === "string") {
    return text.replace(sensitivePattern(client), "「ｒｅｄａｃｔｅｄ」").replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
  }
  return text;
};
