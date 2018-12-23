exports.join = {
    "noConnect": [
        ":x: I do not have enough permissions to connect to your voice channel. I am missing the connect permission. (You may want to check if I can speak in that channel too :wink:)"
    ],
    "noSpeak": [
        "Wow. Invite me to play music for you, yet I can't speak in the channel. You are more heartless than my owner. Give me the channel permission to speak and then try again."
    ],
    "success": [
        "Now tuned into: -channel. Ready and awaiting orders!",
        "Preparing the DJ station in -channel. Now ready for your requested songs!"
    ]
};

exports.leave = [
    "I have left -channel.",
    "The party is now over in -channel."
];

exports.nowplaying = {
    "noQueue": [
        "I don't have any songs to play, baka! Add some using -prefixqueueadd `Youtube URL`",
        "The queue is as existant as your waifu right now. You should add some songs."
    ],
    "notPlay": [
        "Hmm... good question. None of the above. I am not playing anything right now!"
    ],
    "success": [/*Placeholder as this is not needed currently*/]
};

exports.pause = { 
    "paused": [
        "BAKA! Your stream is already paused!",
        "The stream is already paused, baka!"
    ],
    "success": [
        "⏸ The mix is now paused."
    ]
};

exports.play = {
    "alreadyPlay": [
        "I'm already playing in your channel, baka!",
        "Can't you tell I'm playing music for you..."
    ], //Already playing
    "noQueue": [
        "Add some songs to the mix first with -prefixqueueadd [Youtube URL]",
        "Whoops! You forgot to add some songs to the queue!",
        "BAKA! There is no music in your queue!"
    ], //Nothing to play
    "allDone": [
        "Looks like my job is done. Add more songs or kick me out of the channel. It doesn't matter to me, baka."
    ], //No more to play
    "nextSong": [
        "📻 Playing -request's request: **-title**"
    ] //Next song playing
};

exports.queue = [
    "I can't show you that page for its page number is greater than my queue pages. There are currently -pgs",
    "Your number is higher than -pgs. So, there is nothing to see there."
];

exports.queueadd = {
    "noURL": [
        "You must provide me with a valid Youtube URL, BAKA!",
        "What is this? This is not a URL I requested!"
    ],
    "listDetect": [
        "Looks like you want a playlist. Hold tight, this may take awhile."
    ],
    "success": [
        "🎵 Added **-title** to the queue 🎶",
        "🎧 **-title** has been added to the queue"
    ],
    "multi": [
        "🎵 Added **-number** songs to the queue 🎶",
        "I've finished adding **-number** songs to the queue. Time for a break."
    ]
};

exports.remove = {
    "noInt": [
        "I only have songs queued in integers. Come back with a whole number, will you?"
    ],
    "success": [
        "**-title** has been removed from the queue."
    ]
};

exports.resume = {
    "noPause": [
        "The stream isn't paused at the moment."
    ],
    "success": [
        "▶ Now resuming your tunes. Keep partying!"
    ]
};

exports.skip = [
    "⏭ Skipped the current song.",
    "On to the next song! ⏭"
];

exports.volume = {
    "noArgs": [
        "📢 Volume: -vol%",
        "Currently playing at -vol%"
    ],
    "zero": [
        "You might as well mute me if you don't want any noise."
    ],
    "overHun": [
        "100% is the max. You just can't have 110%.."
    ],
    "notPlay": [
        "Kind of hard to adjust the volume if I am not playing music."
    ],
    "success": [
        "-action the volume! Volume: -vol%",
        "-action the volume to -vol% as requested!"
    ]
};

exports.general = {
    "userVC": [
        "You need to be in a voice channel first, BAKA!",
        "You aren't even in a voice channel! Don't leave me all alone in a voice channel!",
        "BAKA! You aren't even in a voice channel to begin with! Enter in my voice channel and tell me face to face!"
    ], //User not in VC
    "noQueue": [
        "I'm not even in a voice channel, baka!",
        "I need to be playing music before we do any of that!",
        "It looks like I'm not in a voice channel to begin with...",
        "How can I be playing music when I am not in a voice channel, baka!"
    ], //Margarine not in a VC
    "mismatch": [
        "You are not connected in my voice channel, baka!",
        "BAKA! You aren't even in my voice channel to begin with!",
        "You are not in my voice channel! Come in and tell me face to face!",
        "I'm already playing in another VC. You should join in on the fun instead!"
    ] //Margarine not in the same VC
};