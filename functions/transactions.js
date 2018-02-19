const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./assets/data/score.sqlite");
const speech = require("../assets/values/speech.json");

module.exports = async (client, msg, args, callback) => {
    var user = args.user || msg.author;

    client.funcs.validator({credit: args.credit[0], tags: ["credit"]}, function(data) {
        if (data.valid === false) { return msg.channel.send(data.message); }
    });
    
    this.dbChecker({user: user, credits: args.credit[0]}, function(data) {
        if (data.valid === false) { 
            msg.channel.send(data.credits); 
            callback({valid: false});
        }
        else {
            if (args.credit !== undefined) {
                if (args.credit[1] === "+") { var amount = args.credit[0] + args.credit[2]; }
                else if (args.credit[1] === "-") { var amount = args.credit[0] - args.credit[2]; }
                else if (args.credit[1] === "*") { var amount = args.credit[0] * args.credit[2]; }

                amount = (amount < 0) ? amount : amount - args.credit[0];
                db.run(`UPDATE scores SET credits = ${amount + data.credits} WHERE userId = ${user.id}`);

                callback({valid: true, earnings: amount});
            } else { callback(data); }
        }
    });
};

exports.conf = { requiredModules: [] };

exports.help = {
  name: "transactions",
  type: "functions",
  description: "Checks and does any credit transaction.",
};

exports.dbChecker = (args, callback) => {
    db.get(`SELECT credits FROM scores WHERE userId = "${args.user.id}"`, [], (err, row) => { 
        let text;
        if (err) { console.log(err); text === speech["dbError"][Math.floor(Math.random() * speech["dbError"].length)]; }
        else if (!row) { text === speech["noRow"][Math.floor(Math.random() * speech["noRow"].length)]; }
        else if (row.credits < args.credits) { text === speech["lessCredit"][Math.floor(Math.random() * speech["lessCredit"].length)]; }
        else { text = row.credits; }

        if (Number(text) !== text) { callback({valid: false, credits: text}); }
        else { callback({valid: true, credits: text }); }
    });
};