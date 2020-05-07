exports.starboard = {
    "wrongItem": [
        "Nope, that's not going to work. You're going to need something that matches what you want to set.",
        "Sorry, that's not going to work. You need to match what you want to set."
    ],
    "set": [
        "Okay! I've set -target to -item!",
        "You're all set! -target is now set to -item!"
    ],
    "list": [
        "Okay! Here's your starboard settings:\n__Channel:__ <#-channel>\n__Emote:__ -emote\n__Amount:__ -amount"
    ],
    "noItem": [
        "Hmm... looks like you didn't want me to set anything.",
        "Didn't want me to set anything? Okay then..."
    ],
    "remove": [
        "Okay! I've set -target back to its original state.",
        "-target is now back to its original state!",
        "Okay! -target will be at it's default value then."
    ]
};

exports.setrole = {
    "highpos": [
        "I can't assign that role. It's much higher than my highest role. Try lowering its position before making it assignable.",
        "That role's position is much higher than my highest. I won't be able to assign that role until you lower its position. Try again once you do!"
    ],
    "added": [
        "Okay! I'll be sure to distribute -role from now on!",
        "-role is now on my list of assignables!"
    ],
    "remove": [
        "Okay! I'll stop distributing -role from now on!",
        "-role has been removed from my list of assignables!"
    ]
};

exports.setprefix = [
    "Okay! I've updated the guild prefix to -editPrefix.",
    "I'll be sure to stay on the lookout for -editPrefix now."
];