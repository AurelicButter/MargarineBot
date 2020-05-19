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
            description: "Purges X amount of messages from a given channel.",
            usage: "<amount:intcheck{2,99}> [user:usersearch]", usageDelim: " ",
            extendedHelp: "Due to limitations, purge can only delete between 2 and 99 messages. If you wish to purge more, please wait out the cooldown (30 seconds) and do it again."
        });

        this.humanUse = "<amount> [user]";
    }

    async run(msg, [amount, user]) {
        let msgCount = amount + 1;

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
                const filterBy = user ? user.id : this.client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
                var extra = `by ${user.tag} `;
            }

            msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
            msg.channel.send(this.client.speech(msg, ["purge"], [["-amount", amount], ["-user", (extra || "")]]));
        });
    }
};