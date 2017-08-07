const moment = require("moment");

module.exports = (client) => {
    console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] This is Margarine speaking!`);
    console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Online and awaiting orders!`);
};
