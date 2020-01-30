exports.kick = []; //Placeholder
exports.ban = []; //Placeholder

exports.mute = {
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
        "-user has been unmuted!"
    ],
    "muted": [
        "-user has been muted!"
    ]
};

exports.purge = {
    "badCount": [ //Count is not between 2 and 99
        "You didn't give me an amount between 2 and 99 to delete!"
    ],
    "success": [
        "Purged -amount messages -userfrom the channel."
    ]
};