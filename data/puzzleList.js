const puzzleList = [
  {
    name: 'lockpad',
    location: 'room1',
    message: 'There is a door here. A keypad sits on the handle. I need a passcode to unlock the door.',
    promptMessage: 'Please enter a passcode to unlock the door: ',
    solvedMessage: 'You successfully unlocked the door.',
    answer: '12345',
    wrongAnswer: 'Incorrect passcode, please try again or type "back" to exit.',
    isSolved: false,
  },
  {
    name: 'grandDoor',
    location: 'room2',
    message: 'A grand door, adorned with mystical symbols, stands firmly locked. It beckons you to unravel its secrets, hinting at a stairway beyond that leads to unknown heights.',
    promptMessage: 'It looks like you need a key to open this door: ',
    solvedMessage: "You've unlocked the grand church door! 🚪",
    answer: '1999',
    wrongAnswer: 'You can\'t open this door, please try again with other items or type "back" to exit.',
    isSolved: false,
  },
  {
    name: 'hiddenPassage',
    location: 'room5',
    message: 'Upon closer inspection, you see a mysterious inscription:\n"Through shadows deep, where secrets hide,\nA path unknown, yet side by side.\nTo open the way, seek the key,\nA relic lost, for eyes to see."',
    promptMessage: 'You must unravel the meaning of the riddle and discover the hidden key and use it here to reveal the hidden passage: ',
    solvedMessage: 'The amulet resonates with the shadows, aligning with the theme of the puzzle. It reveals the hidden passage to a mysterious room.',
    answer: '0981',
    wrongAnswer: 'Nothing happened, please try again with other items or type "back" to exit.',
    isSolved: false,
  },
  {
    name: 'oldAltar',
    location: 'room6',
    message: 'As you step toward the altar an ominous presence fills the air.',
    promptMessage: 'To unlock its secrets, you must burn a magical artifact and recite the ancient incantation.\nBe warned: a single mistake will bring forth a malevolent force, sealing your fate! ',
    solvedMessage: 'The portal trembles and then opens, revealing the path to victory!',
    answer: 'In shadows bound, secrets unchain. In darkness found, the path remains.',
    wrongAnswer: 'Your incantation falters, and a malevolent force emerges from the shadows, enveloping you. The world fades away as you succumb to the darkness. Game over.',
    isSolved: false,
  },
]

export default puzzleList
