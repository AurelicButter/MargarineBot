exports.report = {
    "start": [
        "I'm going to be asking a couple of questions so I'll be taking this into your DMs.",
        "Time for a questionaire! I'll be asking a couple questions in your DMs.",
        "Time for a trip into your DMs. Don't worry, I'll only be asking a couple of questions."
    ],
    "q1": [
        "Alright. Let's get to the point. First question: What kind of issue is this?\nPlease answer `issue`, `bug`, `complaint`, or `suggestion`",
        "What kind of issue are we talking about?\nPlease answer `issue`, `bug`, `complaint`, or `suggestion`"
    ],
    "q2": [
        "Next: Please provide a decently sized message explaining the issue.",
        "Next, I'm going to need a decently sized message explaining the issue."
    ],
    "err1": [
        "You are not able to send todo reports. Only the bot owner can.",
        "You found a secret command word! Too bad only the bot owner can go past this point. Try again with a different word."
    ],
    "timeout": {
        "t1": [
            "You didn't provide me with a description in time. I recommend either making your report shorter or copy pasting so that you don't have to try and type it so quickly.",
            "Looks like you timed out but don't worry. Take your time finishing your message and then try again. I recommending copy pasting so you don't have to speed type it."
        ],
        "t2": [
            "It seems you have timed out with making a report. When you are ready, feel free to try again!",
            "Looks like the time ran out! Take a moment to prepare yourself and then contact me when ready."
        ]
    }
};

exports.award = {
    "noType": [ //User does not provide an award type.
        "BAKA! I need a type of an award!",
        "But, what kind of award are you giving someone? You never provided me with one!"
    ],
    "noText": [ //User does not provide a reason for the award.
        "Explain yourself on giving the award!",
        "Tell me a story. Express yourself. Or just explain why you are giving an award. That works too."
    ],
    "success": [
        "<@-id>, (-id) has been awarded -credits credits!",
        "Congratulations <@-id> (-id)! You've been awarded -credits credits!",
        "<@-id> (-id) has been awarded -credits shiny credits!"
    ]
};

exports.usersearch = [
    "Whatever you are trying to find, it's not typed right or it doesn't exist.",
    "Where is the user? I don't know but not any location where I can find it!",
    "I couldn't find the user! Give me a better thing to search with, baka!",
    "Another non-existant user? Really?",
    "... There isn't a user here, baka!",
    "You say user, I say doesn't exist. Baka!",
    "BAKA! That user doesn't exist! Stop trying to trick me."
];