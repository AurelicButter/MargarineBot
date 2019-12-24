const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'invite',
            runIn: ['text', 'dm'],
            aliases: [],
            guarded: true,
            description: "Displays the invite link for Margarine.",
            usage: ""
        });
    }

    async run(msg) {
        return msg.send(`My invite link: <${this.client.invite}> 
        \nThe above invite link is generated requesting the minimum permissions required to run all of my current commands. If there is a command that requires another permission that is not selected, I will let you know so that you can make those changes. :smile:`);
    }
}