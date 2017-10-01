const Komada = require("komada");
const config = require("./settings.json");

Komada.start({
    botToken: config.token,
    ownerID: config.ownerID,
    clientID: config.clientID,
    prefix: config.prefix,
    clientOptions: {
      fetchAllMembers: false,
    },
});
