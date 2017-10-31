const Komada = require("komada");
const config = require("./settings.json");

const client = new Komada.Client({
    ownerID: config.ownerID,
    prefix: config.prefix,
    clientOptions: {
      fetchAllMembers: false,
    },
    cmdLogging: false,
});

client.login(config.token);
