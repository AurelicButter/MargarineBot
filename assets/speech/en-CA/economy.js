/*Speech for all commands in the general economy section*/

exports.balance = []; //Placeholder

exports.daily = { 
    "self": [
        "You have redeemed 100 credits!",
        "Poof! You are 100 credits richer now!",
        "Don't go gambling your 100 credits all in one place now.",
        "You have redeemed your daily credits. Come back tomorrow at the same time for more!",
        "You should buy me a game with those credits. I won't take all 100 on you, I swear."
    ],
    "other": [
        "Oh? Feeling generous are we? You have given -user -credit credits!",
        "Success! -user is now -credit credits richer!",
        "-user is really going to make it rain with -credit extra credits in their pockets!"
    ]
};

exports.exchange = [
    "-user1 just gave -user2 -credit credits!",
    "Looks like -user2 is -credit credits richer because of -user1.",
    "Exchange complete, -user1! -user2 has received -credit credits.",
    "Credits exchanged! -credit credits have been given to -user2." 
];

exports.rep = [
    "You have given -mention a reputation point!",
    "One new, shiny reputation point for -mention has been given!"
];
