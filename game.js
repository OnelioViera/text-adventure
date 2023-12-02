/**
 * The startGame function initializes the game state and displays the first text node.
 */
/* These lines of code are selecting HTML elements with the IDs 'text' and 'option-buttons' and
assigning them to the variables `textElement` and `optionButtonsElement`, respectively. These
variables are used to manipulate the text and option buttons displayed in the game. */
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

/* The line `let state = {}` is initializing an empty object called `state`. This object is used to
keep track of the game state, such as whether the player has obtained certain items or made certain
choices. The `state` object is updated throughout the game as the player selects different options,
and it is used to determine which options are available to the player in each text node. */
let state = {}

/**
 * The startGame function initializes the game state and displays the first text node.
 */
function startGame() {
    state = {}
    showTextNode(1)
}

/* The `showTextNode` function is responsible for displaying the text and options for a specific text
node in the game. */
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    /* The code block is iterating over the options array of a specific text node and creating buttons
    for each option. */
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

/**
 * The function "showOption" checks if a given option should be shown based on a required state.
 * @param option - The "option" parameter is an object that represents an option. It likely has
 * properties such as "requiredState" and "state".
 * @returns a boolean value.
 */
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

/**
 * The function `selectOption` is used to handle user-selected options in a text-based game by updating
 * the game state and displaying the next text node.
 * @param option - The `option` parameter is an object that represents the selected option. It contains
 * the following properties:
 * @returns the result of calling the `startGame()` function if `nextTextNodeId` is less than or equal
 * to 0.
 */
function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

/* The `textNodes` constant is an array of objects that represent different text nodes in the game.
Each object in the array represents a specific text node and contains properties such as `id`,
`text`, and `options`. */
const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and you see a jar of blue goo near you.',
        options: [
            {
                text: 'Take the goo',
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: 'Leave the goo',
                nextText: 2
            }
        ]
    },
    {
        /* This code block represents the second text node in the game. It displays the text "You venture forth
        in search of answers to where you are when you come across a merchant." and provides three options
        for the player to choose from. */
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [
            {
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                nextText: 3
            }
        ]
    },
    {
        /* This code block represents the third text node in the game. It displays the text "After leaving the
        merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle."
        and provides three options for the player to choose from. The options are:
        1. "Explore the castle" - selecting this option will lead to the fourth text node.
        2. "Find a room to sleep at in the town" - selecting this option will lead to the fifth text node.
        3. "Find some hay in a stable to sleep in" - selecting this option will lead to the sixth text node. */
        id: 3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 4
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6
            }
        ]
    },
    {
        /* This code block represents the fourth text node in the game. It displays the text "You are so tired
        that you fall asleep while exploring the castle and are killed by some terrible monster in your
        sleep." and provides one option for the player to choose from, which is to restart the game. If the
        player selects this option, the game will start again from the beginning. */
        id: 4,
        text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        /* This code block represents the fifth text node in the game. It displays the text "Without any money
        to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep, the owner
        of the inn finds you and has the town guard lock you in a cell." This text node describes a scenario
        where the player tries to sleep in an inn without paying and gets caught by the owner, resulting in
        being locked in a cell by the town guard. */
        id: 5,
        text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        /* This code block represents the sixth text node in the game. It displays the text "You wake up well
        rested and full of energy ready to explore the nearby castle." and provides one option for the
        player to choose from, which is to explore the castle. If the player selects this option, the game
        will proceed to the seventh text node. */
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 7
            }
        ]
    },
    {
        /* This code block represents the seventh text node in the game. It displays the text "While exploring
        the castle you come across a horrible monster in your path." and provides four options for the
        player to choose from: */
        id: 7,
        text: 'While exploring the castle you come across a horrible monster in your path.',
        options: [
            {
                text: 'Try to run',
                nextText: 8
            },
            {
                text: 'Attack it with your sword',
                requiredState: (currentState) => currentState.sword,
                nextText: 9
            },
            {
                text: 'Hide behind your shield',
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
            {
                text: 'Throw the blue goo at it',
                requiredState: (currentState) => currentState.blueGoo,
                nextText: 11
            }
        ]
    },
    {
        /* The code block you provided represents two text nodes in the game. */
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        /* This code block represents the ninth text node in the game. It displays the text "You foolishly
        thought this monster could be slain with a single sword." and provides one option for the player to
        choose from, which is to restart the game. If the player selects this option, the game will start
        again from the beginning. */
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        /* This code block represents the tenth text node in the game. It displays the text "The monster
        laughed as you hid behind your shield and ate you." This text node describes a scenario where the
        player tries to hide behind their shield to protect themselves from the monster, but the monster is
        able to overpower them and eat them. */
        id: 10,
        text: 'The monster laughed as you hid behind your shield and ate you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        /* This code block represents the eleventh text node in the game. It displays the text "You threw your
        jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed.
        Seeing your victory you decide to claim this castle as your and live out the rest of your days
        there." This text node describes a scenario where the player successfully defeats the monster by
        throwing the jar of goo at it. The player then decides to claim the castle as their own and live
        there happily. The only option available to the player in this text node is to restart the game. If
        the player selects this option, the game will start again from the beginning. */
        id: 11,
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        options: [
            {
                text: 'Congratulations. Play Again.',
                nextText: -1
            }
        ]
    }
]

/* The `startGame()` function initializes the game state by resetting the `state` object to an empty
object. It then calls the `showTextNode()` function with an argument of 1, which displays the first
text node in the game. */
startGame()