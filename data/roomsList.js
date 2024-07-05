const roomsList = [
  {
    name: 'Main Street',
    description1: '182 Main St. \nYou are standing on Main Street between Church and South Winooski.',
    description2: 'There is a door here. A keypad sits on the handle. \nOn the door is a handwritten "sign".',
    inventory: ['sign'],
    isUnlocked: true,
  },
  {
    name: 'Church',
    description1: 'You stand within the sacred walls of the church, soft candlelight casts shadows on ornate stained glass. Worn pews echo with countless prayers. In a corner, a piece of paper radiates powerful energy, concealing a mysterious secret within its magical symbols.',
    description2: 'At the back of the church, you notice two doors:\n1(Floor one): A grand door, adorned with mystical symbols, stands firmly locked. It beckons you to unravel its secrets, hinting at a stairway beyond that leads to unknown heights.\n2(Basement one): Adjacent to it, a humble wooden door stands slightly ajar, revealing a set of stairs that descend into darkness. The passage to the basement lies open, inviting exploration.',
    inventory: ['paper'],
    isUnlocked: false,
  },
  {
    name: 'First Floor',
    description1:
      'You find yourself on the first floor of the building. The air is filled with a quiet hum, and soft footsteps echo in the distance. The walls are adorned with framed artwork, and large windows allow sunlight to filter into the corridor. A reception desk is situated near the entrance, and hallways lead to various rooms and offices. You notice a staircase nearby, hinting at more levels to explore. Take a moment to absorb the atmosphere of this bustling and organized first floor.',
    description2: 'In one corner of the room, a display case draws your attention. Within it rests an intriguing item: the Shadow Amulet. The Shadow Amulet is the key to unlocking the hidden passage in the basement. When you possess the amulet, you can use it in proximity to the peculiar wall, and it will reveal the entrance to the next level.',
    inventory: ['shadow amulet'],
    isUnlocked: false,
  },
  {
    name: 'Second Floor',
    description1: 'As you ascend the staircases, you find yourself on the second floor, a place steeped in mystery and ancient secrets. The air is thick with the scent of old books and the soft glow of mystical runes illuminates the walls.',
    description2: "You notice a writing of cryptic phrases repeating on the walls: 'In shadows bound, secrets unchain. Speak the words to unveil the path.' The building seems to respond to these arcane words.",
    inventory: [''],
    isUnlocked: true,
  },
  {
    name: 'Basement one',
    description1: 'You descend a creaky staircase, entering the dimly lit confines of the basement. The air is cool and slightly damp, and the faint scent of earth permeates the space. Dim, flickering light bulbs barely illuminate the area, casting long shadows along the concrete walls. You notice a peculiar wall in the basement, different from the others. Could it be a hidden passage, waiting to be discovered?',
    description2: 'As you explore the dimly lit basement, your eyes catch a glint of metal on an old wooden table. Moving closer, you discover an ornate key resting on the surface. The key is intricately designed, with winding patterns and delicate engravings that give it an air of elegance.',
    inventory: ['ornate key'],
    isUnlocked: true,
  },
  {
    name: 'Basement two',
    description1: 'You descend even deeper into the building, reaching the final basement level. A dimly lit room in the basement reveals ancient stone walls covered in mysterious runes.',
    description2: "In the center, on an old altar, a magical, eternal fire flickers, casting dancing shadows across the runes. The altar's surface is worn with time. A hint of magic lingers in the air.",
    inventory: [''],
    isUnlocked: false,
  },
  {
    name: 'Final room',
    description1: 'As you step into the final room, an ominous presence fills the air. Before you, a mystical portal shrouded in darkness awaits. To unlock its secrets, you must recite the ancient incantation. Be warned: a single mistake will bring forth a malevolent force, sealing your fate.',
    description2: 'This is the place to unveil hidden secrets. With caution, you decide to burn the magic paper here, anticipating the release of a powerful energy.',
    inventory: [''],
    isUnlocked: false,
  },
]

export default roomsList
