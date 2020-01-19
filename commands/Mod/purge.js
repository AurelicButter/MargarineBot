const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "purge",
            enabled: true,
            runIn: ["text"],
            permissionLevel: 5,
            cooldown: 30,
            requiredPermissions: ["MANAGE_MESSAGES"],
            description: "Purges X amount of messages from a given channel. Amount will default to 10, if none is given.",
            usage: "[amount:int] [user:usersearch]", usageDelim: " ",
            extendedHelp: "Due to limitations, purge can only delete between 2 and 99 messages. If you wish to purge more, please wait out the cooldown (30 seconds) and do it again."
        });
    }

    async run(msg, [amount=10, user]) {
        let msgCount = amount + 1;
        if (msgCount < 2 || msgCount > 100) { return msg.channel.send(this.client.speech(msg, ["purge", "badCount"])); }

        let userCheck = msg.content.slice(msg.content.search("purge")).split(this.usageDelim);
        if (user === null && userCheck[2]) { return; } //User not found. Exit command.

        if (msg.channel.permissionsFor(msg.author.id).has("MANAGE_MESSAGES") === false) {
            const embed = new MessageEmbed()
                .setColor("#FF0000")
                .setTimestamp()
                .setTitle("❌ ERROR: MISSING PERMISSIONS! ❌")
                .setDescription("You do not have the correct permissions for this command!");
            
            return msg.channel.send({embed});
        }

        msg.channel.messages.fetch({ limit: msgCount }).then((messages) => {
            if (user && userCheck[2]) {
                const filterBy = user ? user.id : client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
                var extra = `by ${user.tag} `;
            }

            msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
            msg.channel.send(this.client.speech(msg, ["purge", "success"], [["-amount", amount], ["-user", (extra || "")]]));
        });
    }
};