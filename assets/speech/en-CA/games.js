/* 
 * Speech for economy type game commands 
 */

module.exports = {
    "chouhan": {
        "win": [
            "**Sum:** -sum \n**Guess:** -guess \nYou have won -earnings credits!",
            "**Sum:** -sum \n**Guess:** -guess \nVictory! You have won -earnings credits!"
        ],
        "lose": [
            "**Sum:** -sum \n**Guess:** -guess \nYou have lost -earnings credits.",
            "**Sum:** -sum \n**Guess:** -guess \nYou have lost -earnings credits. Better luck next time."
        ]
    },
    "coin": {
        "win": [
            "**-result!** You have won -earnings credits!",
            "**-result!** You got -earnings credits for winning."
        ],
        "lose": [
            "**-result!** You have lost -earnings credits!",
            "**-result!** You lost -earnings credits for losing."
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
    },
    "blackjack": {
        "timedout": [
            "Looks like the player left the table. Come back again if you want to play.",
            "Hello? Hellooooo? Huh, looks like the player left the table. Come back again."
        ],
        "win": [
            "-player has won -earnings credits!"
        ],
        "lose": [
            "-player has lost -earnings credits!"
        ]
    }
};