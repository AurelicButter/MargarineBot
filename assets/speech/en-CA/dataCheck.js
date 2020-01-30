exports.noUser = [ //For when the target user does not exist in the database
    "That user hasn't redeemed their first daily yet! :cry:",
    "Sadly, that user does not like my games and didn't redeem their first daily yet.",
    "Looks like this person has yet to redeem their first daily!",
    "This person doesn't exist in my systems. Have they redeemed their first daily yet? Do they even like my games?",
    "Oh... it looks like this person doesn't care for my games... they should redeem their first daily if they want to play.", 
];

exports.noAccount = [ //When the user does not exist in the database
    "You haven't redeemed your first daily yet! :cry:",
    "You haven't signed up and received your credits yet! D:",
    "You need some credits to do this, baka! Get some with the daily command!",
    "Credits speak a whole lot of value in these parts. Set yourself up with a daily command first!",
    "Get yourself some credits first!",
    "Where are your credits?! Oh. You haven't redeemed your first daily yet...",
    "Oh... you didn't redeem your first daily yet...",
    "Oh no! You haven't redeemed your first daily yet! You should do that and then come back.",
    "Seems like you haven't redeemed your first daily yet. Go and do that, you'll be able to play."
];

exports.sameUser = [ //When the target is the user but command can't have the same
    "Hey! You can't select yourself with this command!",
    "Stop! Select someone else if you want to use this command!"
];

exports.cooldown = [ //When the user is too early to use a command.
    "Trying to cash in early? I'm not having it! Wait it out, baka!",
    "Trying to cheat and get something you already got today, are we now? Rude!",
    "You've already redeemed yours today! Come back tomorrow!"
];

exports.lackCredits = [ //When the user doesn't have enough credits
    "Looks like you don't have enough credits for that kind of spending.",
    "You don't have that many credits, baka!",
    "A poor person like yourself could never afford that bet.",
    "Try paying in dirt. It's worth more than your bank right now.",
    "Try to pull a fast one on me? Too bad you can't afford it, baka!",
    "That's an awfully high amount for someone who can't afford it."
];

exports.noItems = [ //When an item does not exist in the items.json file.
    "Hmm... nope. Not finding that item here.",
    "That's not an item."
];

exports.noZero = [ //When a command requires a nonzero amount.
    "Hey! You don't have any of this!",
    "You can't have nothing here!"
];

exports.revoked = [ //User tried to make a new profile after deleting their data (Less than 24 hours)
    "You can't do this yet! It's been too soon since you've deleted your own data.",
    "Nope, wait a little longer if you want back in. There's a cooldown for deleting your own data."
];