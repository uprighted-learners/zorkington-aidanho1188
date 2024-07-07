const itemsList = [
  {
    name: 'sign',
    description: 'The sign says "Welcome to the Mystical Church of Wonders! If the door is locked, use the code 12345."',
    location: 'room0',
    isTakeable: false,
  },
  {
    name: 'paper',
    description: 'A spell scroll with intricate symbols. Burn it at the right place, and a powerful energy will reveal a hidden magical item with a secret waiting to be unlocked.',
    location: 'room1',
    isTakeable: true,
  },
  {
    name: 'ornate key',
    description: 'An intricately crafted key with mystical symbols. It feels heavy in your hand, hinting at its significance.',
    location: 'room4',
    isTakeable: true,
    puzzleCode: '1999',
  },
  {
    name: 'shadow amulet',
    description: 'An ornate amulet with a dark gem at its center. It exudes an otherworldly aura, and intricate engravings adorn its surface.',
    location: 'room3',
    isTakeable: true,
    puzzleCode: '0981',
  },
]

export default itemsList
