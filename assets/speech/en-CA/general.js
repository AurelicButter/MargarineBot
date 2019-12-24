exports.anilist = [ //Missing search term
    "You forgot to include a search term!",
    "Here is your result for nothing: \" \". Give me a search term next time, baka!"
];

exports.anime = {
    "noSearch": [
        "You're missing a search term, baka!"
    ],
    "noResult": [
        "There's not an anime by that name!"
    ],
    "nsfw" : [
        "You can't search for hentai in a SFW channel!",
        "Keep your porn out of the safe for work channels, baka!"
    ]
};

exports.manga = {
    "noSearch": [
        "You're missing a search term, baka!",
        "I need a title or something, baka! Come back with one!",
        "Searching for nothing... Oh wait. I don't have to. Give me a search term next time, baka!"
    ],
    "noResult": [
        "There's not a manga by that name!",
        "Good news! You can use that for your next upcoming book! There isn't a manga by that name."
    ],
    "nsfw" : [
        "You can't search for hentai in a SFW channel!",
        "Porn belongs in the porn channels. Not in a safe for work channel."
    ]
};

exports.avatar = []; //Placeholder

exports.award = {
    "noType": [
        "BAKA! I need a type of an award!",
        "But, what kind of award are you giving someone? You never provided me with one!"
    ],
    "noText": [
        "Explain yourself on giving the award!",
        "Tell me a story. Express yourself. Or just explain why you are giving an award. That works too."
    ],
    "noRow": [
        "That user has not gotten their first daily yet!",
        "That user doesn't seem to like my games. They haven't even claimed their first daily yet!",
        "Looks like that user doesn't have a profile. Sad. No rewards for them."
    ],
    "success": [ //Parameter 1: User id, Parameter 2: Awarded Credits
        "<@-id>, (-id) have been awarded -credits credits!",
        "<@-param1>, (-param1) has been awarded -param2 credits!",
        "Congratulations <@-param1> (-param1)! You've been awarded -param2 credits!"
    ]
};

exports.calculate = [];

exports.choose = {
    "lackChoice": [
        "There's not a lot of options here, is there?",
        "Choosing requires two or more options, baka!",
        "Just pick the option that's not competing with any others! You only have one choice there, baka!"
    ],
    "success": [
        "-user, I think that **-result** would be the best choice!",
        "Hmm... looks like **-result** is the best option",
        "**-result** looks rather tempting. I'd pick that one.",
        "Why did was it so hard to choose? **-result** is obviously the best choice, -user!"
    ]
};

exports.emoji = {
    "noName": [
        "You need a name of an emote to search with, baka!"
    ],
    "noID": [
        "You need to specify a message's ID so that I can find it!"
    ],
    "badName": [
        "Type the emote's name right and try again, baka!"
    ]
};

exports.greet = {
    "me": [ //Parameter 1: Username
        "How rude, -param1! I'm not that lonely!",
        "Trying to make me seem lonely. Bad -param1!"
    ],
    "success": [ //Parameter 1L Username
        "Why hello there, -param1!",
        "Hello, -param1! I hope you are doing well.",
        "And good day to you, -param1!"
    ]
};

exports.help = [];

exports.serverinfo = []; //Placeholder
exports.userinfo = []; //Placeholder

exports.roleinfo = [
    "Looks like I can't find the role. Be sure it is spelled correctly.",
    "Are you sure that exists? I don't think it does."
];

exports.mal = []; //Placeholder

exports.report = {
    "start": [
        "I'm going to be asking a couple of questions so I'll be taking this into your DMs.",
        "Time for a questionaire! I'll be asking a couple questions in your DMs."
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