/* 
 * Speech for economy type game commands 
 */

module.exports = {
    "chouhan": {
        "win": [
            "**Sum:** -sum \n**Guess:** -guess \nYou have won -earning credits!",
            "**Sum:** -sum \n**Guess:** -guess \nVictory! You have won -earning credits!"
        ],
        "lose": [
            "**Sum:** -sum \n**Guess:** -guess \nYou have lost -earning credits.",
            "**Sum:** -sum \n**Guess:** -guess \nYou have lost -earning credits. Better luck next time."
        ]
    },
    "coin": {
        "win": [
            "**-result!** You have won -earning credits!",
            "**-result!** You got -earning credits for winning."
        ],
        "lose": [
            "**-result!** You have lost -earning credits!",
            "**-result!** You lost -earning credits for losing."
        ]
    },
    "hazard": null, //Placeholder
    "twoup": {
        "win": [
            "**Coins:** -result\n You have won -earnings credits!"
        ],
        "lose": [
            "**Coins:** -result\n You have lost -earnings credits!"
        ]
    }
};