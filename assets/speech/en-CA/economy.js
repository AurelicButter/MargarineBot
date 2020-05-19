/* 
 * Speech for all commands in the general economy section
 */

module.exports = {
    "balance": null, //Placeholder
    "daily": {
        "self": [
            "You have redeemed -credit credits!",
            "Poof! You are -credit credits richer now!",
            "Don't go gambling your -credit credits all in one place now.",
            "You have redeemed your daily credits. Come back tomorrow at the same time for more!",
            "You should buy me a game with those credits. I won't take all -credit on you, I swear.",
            "Nice! Now you'll be able to buy me a game with those credits! Don't worry, I won't take all -credit on you."
        ],
        "other": [
            "Oh? Feeling generous are we? You have given -user -credit credits!",
            "Success! -user is now -credit credits richer!",
            "-user is really going to make it rain with -credit extra credits in their pockets!"
        ]
    },
    "exchange": [
        "-user1 just gave -user2 -credit credits!",
        "Looks like -user2 is -credit credits richer because of -user1.",
        "Exchange complete, -user1! -user2 has received -credit credits.",
        "Credits exchanged! -credit credits have been given to -user2." 
    ],
    "rep": [
        "You have given -mention a reputation point!",
        "One new, shiny reputation point for -mention has been given!",
        "-mention has been awarded a reputation point!"
    ],
    "revoke": {
        "prompt": [
            "By doing this, you will delete all of your data. If you want to do this, reply with \"yes\".",
            "You will delete all of your data if you do this. To confirm your action, reply with \"yes\"."
        ],
        "stopped": [
            "Action aborted. Nothing has happened.",
            "Action cancelled! Nothing has happened."
        ],
        "success": [
            "Okay. I've deleted your data from my systems. If you want to give it to me again, wait 24 hours.",
            "Just like that, your data is deleted. If you want to give it to me again, wait 24 hours before redeeming a daily."
        ],
        "timeout": [
            "Whoops! Looks like you forgot to respond to me. I'm not waiting around anymore.",
            "I can't wait all day. Try again when ready to."
        ]
    }
};