/* Speech for cooking specific commands */

exports.craft = {
    "noRecipe": [
        "I couldn't find a recipe like that!" 
    ],
    "success": [
        "Oh! You've crafted -amount of -item!"
    ]
};

exports.fish = [
    "Nice catch! You just caught yourself -kind and placed it in your inventory.",
    "Looks like you'll be dining on -kind tonight. You place it in your inventory.",
    "You have caught -kind! You placed it in your inventory.",
    "Oh! A -kind. Looks like that's a winner. You have placed it in your inventory."
];

exports.harvest = {
    "noRow": [
        "You should redeem your first daily. Then, you can harvest all you like."
    ],
    "noCredits": [
        "Hmm... you seem to be lacking in credits. Find some and come back."
    ],
    "success": [
        "You found a -kind. You placed it in your inventory",
        "That looks like a fine -kind. You placed it in your inventory.",
        "A -kind! You could make a good meal out of that one. You placed it in your inventory."
    ]
};

exports.inventory = [ //No account. Seperate from dataCheck since no credits are needed
    "Doesn't look like you've redeemed your first daily yet. Do that and then you'll have an inventory to look at!",
    "You don't have an inventory yet. Redeem your first daily to get one!"
];

exports.sell = {
    "notEnough": [
        "You don't have enough of this to sell!"
    ],
    "success": [
        "Success! You've sold -amount of -item for -price!"
    ]
};