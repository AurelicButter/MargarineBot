/* 
 * Speech for all moderator commands
 */

module.exports = {
    "kick": null, //Placeholder
    "ban": null, //Placeholder
    "mute": {
        "noRole": [
            "Your server does not have a mute role set up!",
            "There is no mute role set up in this server. I can't mute anyone!"
        ],
        "admin": [
            "I guess you can... they are an admin so this won't be effective at all...",
            "This won't be effective at all... they are an admin."
        ],
        "rolePos": [
            "I can't do this! The role is too high for me to access!"
        ],
        "unmuted": [
            "-user has been unmuted!",
            "Speak -user! You have been unmuted."
        ],
        "muted": [
            "-user has been muted!",
            "There shall be silence! -user has been muted."
        ]
    },
    "purge": [
        "Purged -amount messages -userfrom the channel.",
        "-amount message -userhas been removed from the channel!"
    ]
};