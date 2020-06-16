/*
 * Speech module for all configuation commands.
 */

module.exports = {
    "starboard": {
        "wrongItem": [
            "Nope, that's not going to work. You're going to need something that matches what you want to set.",
            "Sorry, that's not going to work. You need to match what you want to set."
        ],
        "set": [
            "Okay! I've set -target to -item!",
            "You're all set! -target is now set to -item!"
        ],
        "list": [
            "Okay! Here's your starboard settings:\n__Channel:__ <#-channel>\n__Emote:__ -emote\n__Amount:__ -amount",
            "Behold! Your starboard settings:\n__Channel:__ <#-channel>\n__Emote:__ -emote\n__Amount:__ -amount"
        ],
        "noItem": [
            "Hmm... looks like you didn't want me to set anything.",
            "Didn't want me to set anything? Okay then...",
            "Nothing to set this to? Okay, I guess I won't set anything then."
        ],
        "remove": [
            "Okay! I've set -target back to its original state.",
            "-target is now back to its original state!",
            "Okay! -target will be at it's default value then."
        ]
    },
    "setrole": {
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
    },
    "setprefix": [
        "Okay! I've updated the guild prefix to -editPrefix.",
        "I'll be sure to stay on the lookout for -editPrefix now."
    ],
    "disablecommand": {
        "noStr": [
            "I need a command name to disable something!",
            "You can't expect me to read your mind! Give me a command name to work with!"
        ],
        "guarded": [
            "This command is guarded. I can't disable it as it will affect my abilities too much.",
            "No can do. This is a guarded command and I'm not willing to disable those as it will break your experience."
        ],
        "disable": [
            "Okay! I've disabled -name. You are no longer able to use it.",
            "-name is no longer enabled.",
            "And... done! You no longer have to worry about -name running in the guild now."
        ],
        "enable": [
            "Okay! I've reenabled -name. You are able to use it.",
            "-name has been reenabled!",
            "*Flicks switch* Okay! -name has been reenabled!"
        ]
    }
};