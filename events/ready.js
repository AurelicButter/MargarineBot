const moment = require("moment");

exports.run = async client => { 
    //await setTimeout("", 1000);
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] This is Margarine speaking!`);
    await console.log(`[${moment().format("YYYY-MM-DD HH:mm")}] Online and awaiting orders!`);
}