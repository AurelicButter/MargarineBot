exports.join = {
    "noConnect": [
        ":x: I do not have enough permissions to connect to your voice channel. I am missing the connect permission. (You may want to check if I can speak in that channel too :wink:)",
        "Huh, looks like I do not have the permissions to connect to your voice channel. I'm currently missing the connect permission. (You should check if I can also speak in the channel too!)"
    ],
    "noSpeak": [
        "Wow. Invite me to play music for you, yet I can't speak in the channel. You are more heartless than my owner. Give me the channel permission to speak and then try again.",
        "Yikes. I've been given the silent treatment. I can't speak in your channel! Please give me the permission to speak and then try again!"
    ],
    "success": [ //Parameter 1: Voice channel name
        "Now tuned into: -param1. Ready and awaiting orders!",
        "Preparing the DJ station in -param1. Now ready for your requested songs!",
        "-param1 is ready to receive your requested songs! All we need now is some music!"
    ]
};

exports.leave = [
    "I have left -channel.",
    "The party is now over in -channel.",
    "Thanks for the fun! I've cleaned up and have left -channel.",
    "And that's it for the fun in -channel! We should do that again some other time."
];

exports.nowplaying = {
    "noQueue": [
        "I don't have any songs to play, baka! Add some using -prefixqueueadd `Youtube URL`",
        "The queue is as existant as your waifu right now. You should add some songs."
    ],
    "notPlay": [
        "Hmm... good question. None of the above. I am not playing anything right now!",
        "There isn't any music playing right now.",
        "But... it's silent. Nothing is playing!"
    ]
};

exports.pause = { 
    "paused": [
        "BAKA! Your stream is already paused!",
        "The stream is already paused, baka!"
    ],
    "success": [
        "⏸ The mix is now paused.",
        "Poof! Just like that, your tunes are paused! ⏸"
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
        "Looks like my job is done. Add more songs or kick me out of the channel. It doesn't matter to me, baka.",
        "Job's done! Time to add more songs or kick me out."
    ], //No more to play
    "nextSong": [ //Parameter 1: Requester, Parameter 2: Song title
        "📻 Playing -param1's request: **-param2**",
        "📻 Now listening to **-param2**, requested by -param1!"
    ] //Next song playing
};

exports.queue = {
    "noList": [
        "You don't have anything in your queue at the moment. Add some with the queueadd command.",
        "There's nothing here. You should add some songs with queueadd!"
    ],
    "highCount": [
        "I can't show you that page for its page number is greater than my queue pages. There are currently -pgs",
        "Your number is higher than -pgs. So, there is nothing to see there."
    ]
};

exports.queueadd = {
    "noURL": [
        "You must provide me with a valid Youtube URL, BAKA!",
        "What is this? This is not a URL I requested!",
        "Wha- This isn't a Youtube URL! BAKA!"
    ],
    "listDetect": [
        "Looks like you want a playlist. Hold tight, this may take awhile."
    ],
    "errCatch": [ //Parameter 1: Youtube ID
        "Whoops! Looks like I can't access this video. <https://youtu.be/-param1>"
    ],
    "success": [ //Parameter 1: Song title
        "🎵 Added **-param1** to the queue 🎶",
        "🎧 **-param1** has been added to the queue"
    ],
    "multi": [ //Parameter 1: Number of songs
        "🎵 Added **-param1** songs to the queue 🎶",
        "I've finished adding **-param1** songs to the queue. Time for a break."
    ]
};

exports.remove = [
    "**-song** has been removed from the queue.",
    "Okay! **-song** has been removed from the queue."
];

exports.resume = {
    "noPause": [
        "The stream isn't paused at the moment.",
        "Huh? I'm playing music right now."
    ],
    "success": [
        "▶ Now resuming your tunes. Keep partying!",
        "Time to start partying again! I've resumed your tunes."
    ]
};

exports.skip = [
    "⏭ Skipped the current song.",
    "On to the next song! ⏭",
    "⏭ Okay! Playing the next song then!"
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
    "success": [ //Parameter 1: Action, Parameter 2: volume
        "-param1 the volume! Volume: -param2%",
        "-param1 the volume to -param2% as requested!"
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
    ], //Margarine not in the same VC
    "noHandler": [ //Margarine needs a dispatcher active in order to do the command
        "Hey! I'm not playing anything right now!",
        "You should really play some music before you try to interact with the music."
    ]
};