/* 
 * Speech for all moderator commands
 */

module.exports = {
    "kick": null, //Placeholder
    "ban": null, //Placeholder
    "mute": {
        "noRole": [
            "Your server does not have a mute role set up!"
        ],
        "admin": [
            "I guess you can... they are an admin so this won't be effective at all..."
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
    "purge": {
        "badCount": [ //Count is not between 2 and 99
            "You didn't give me an amount between 2 and 99 to delete!"
        ],
        "success": [
            "Purged -amount messages -userfrom the channel."
        ]
    }
};