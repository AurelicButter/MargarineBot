/* 
 * Speech for all commands in the fun module
 */

module.exports = {
    "roll": [
        "🎲 You rolled a -value! 🎲",
        "You've rolled -value! 🎲",
        "🎲 Ah ha! You've rolled a -value!",
        "BEHOLD! 🎲 You've rolled -value! *Is that a good thing?*"
    ],
    "rps": {
        "sameUser": [
            "Hey! You can't play rock, paper, scissors with yourself! Invite someone into the mix or play with me instead!",
            "You can't play rock, paper, scissors by yourself! At least invite me to play!"
        ],
        "success": [
            "-user1 plays -hand1! -user2 plays -hand2! **-result!**"
        ]
    },
    "poll": {
        "noTitle": [
            "You need to explain what this poll is before starting one!",
            "So you want to create a poll but not add in the details? That's not going to happen."
        ],
        "noDesc": [
            "I recommend explaining your poll before starting one. That way everyone knows what it's for!",
            "No description, no poll. Is this just a weeb reference? Yes, but it's true."
        ],
        "noChoice": [
            "You'll need more options than that!",
            "You need to provide at least two options!"
        ],
        "noCreate": [
            "Nope! There's already a poll ongoing!",
            "You can't have more than one poll at once. Try again once the other one has finished"
        ],
        "created": [
            "Okay! Your poll is up and ready for voting!",
            "Let the polling begin!"
        ],
        "voted": [
            "I have recieved your vote for -option. You're all set",
            "Okay! You've voted for -option."
        ],
        "noPoll": [
            "It doesn't look like there's a poll going on at the moment. Make one and come back.",
            "No one is polling opinions at the moment."
        ]
    },
    "say": [
        "You need to provide me with a message!",
        "I need a message to echo before I can do this!"
    ],
    "eightball": [
        "It is certain, -user",
        "As I see it, yes, -user",
        "It's looking a bit hazy. Try again",
        "Don't count on it, -user",
        "It is decidedly so, -user",
        "Most likely.",
        "Ask again later, -user. You may have better luck.",
        "Reply sent.... no",
        "Without a doubt, -user!",
        "Outlook is good",
        "Better to leave you wondering, -user",
        "Sources say no.",
        "Yes! Most definitely!",
        "Yes.",
        "Seems my prediction powers are weak at the moment. Try again later.",
        "Outlook is not so good, -user.",
        "The stars say yes, -user.",
        "You may rely on it.",
        "FOCUS! Concentrate your mindset and ask again.",
        "Very doubtful, -user"
    ],
    "crash": [
        "Wow. That's awful of you, -user. I'm just here trying to be helpful and make friends but you want to shut me down. Quite rude!",
        "Ouch! Am I not doing a good enough job for you? BAKA!",
        "-user! So mean! I'm just trying to have fun here!"
    ]
};