/*Speech for all commands in the general economy section*/

exports.balance = [ //Only case is when there is no user in the system
    "Looks like this person has yet to redeem their first daily!",
    "This person doesn't exist in my systems. Have they redeemed their first daily yet? Do they even like my games?",
    "Oh... it looks like this person doesn't care for my games... they should redeem their first daily if they want to play.",
];

exports.daily = { 
    "self": [
        "You have redeemed 100 credits!",
        "Poof! You are 100 credits richer now!",
        "Don't go gambling your 100 credits all in one place now.",
        "You have redeemed your daily credits. Come back tomorrow at the same time for more!",
        "You should buy me a game with those credits. I won't take all 100 on you, I swear."
    ],
    "other": [
        "Oh? Feeling generous are we? You have given -user- -credit- credits!",
        "Success! -user- is now -credit- credits richer!",
        "-user- is really going to make it rain with -credit- extra credits in their pockets!"
    ],
    "noRow": [
        "That user hasn't redeemed their first daily yet! :cry:",
        "Sadly, that user does not like my games and didn't redeem their first daily yet." 
    ],
    "noAccount": [
        "Nani?!?! You can't give other people credits if you haven't recieved your first daily yet!",
        "You have not gotten your first daily yet!",
        "You aren't in my records. You should redeem your first daily before giving to others.",
        "Earn a bit yourself with the daily command before giving to others!"
    ],
    "multi": [
        "You are trying to cheat my daily command! Rude!",
        "You've already redeemed a daily today, baka!",
        "You have already redeemed your daily for today.",
        "No stealing! I already payed your daily worth of credits today, baka!"
    ]
};

exports.exchange = {
    "self": [
        "Why are you trying to exchange credits to yourself? I doubt you are that lonely in life.",
        "Oh? Trying to see if I would exchange your own credits? BAKA!"
    ],
    "default": [
        "-user1- just gave -user2- -credit- credits!",
        "Looks like -user2- is -credit- credits richer because of -user1-.",
        "Exchange complete, -user1-! -user2- has received -credit- credits.",
        "Credits exchanged! -credit- credits have been given to -user2-." 
    ]
};

exports.rep = {
    "sameUser": [
        "You can't rep yourself! That's a bunch of nonsense!"
    ],
    "noSelfRow": [
        "Oh dear. You haven't redeemed your first daily yet..."
    ],
    "noCooldown": [
        "You can't rep someone yet! It hasn't been a full day yet!"
    ],
    "noTargetRow": [
        "Oh dear. That user hasn't redeemed their first daily yet..."
    ],
    "success": [
        "You have given -mention a reputation point!"
    ]
};
