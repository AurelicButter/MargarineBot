module.exports = (msg, amount, user, callback) => {
    const client = msg.client;
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database(client.database.general);

    if (!user) { user = msg.author; }

    var check;
    if (!amount) { check = "none"; }
    else if (amount === 0) { check = "zero"; }
    else if (Number.isInteger(amount) === false) { check = "noInt"; }
    
    if (check) { 
        msg.channel.send(client.speech(msg, ["func-transaction", "validate", check]));
        return false; 
    }

    db.get(`SELECT credits FROM users WHERE userId = "${user.id}"`, [], (err, row) => { 
        let text;
        if (err) { 
            console.log(err);
            text = "err";
        } else if (!row) { text = "noRow"; }
        else if (row.credits < credits) { text = "lessCredit"; }

        if (text) { msg.channel.send(client.speech(msg, ["func-transaction", "dbCheck", test])); return false; }

        db.run(`UPDATE users SET credits ="${amount + row.credits}" WHERE userId = "${user.id}"`);
        callback([true, row.credits, (row.credits + amount)]);
    });
};

exports.help = {
    name: "transaction",
    type: "functions",
    description: "Checks and does any credit transactions."
};