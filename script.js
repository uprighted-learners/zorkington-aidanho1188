document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('input')
  const output = document.getElementById('output')

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const command = input.value
      executeCommand(command)
      input.value = ''
    }
  })

  function executeCommand(command) {
    // Here you can handle different commands
    let result
    switch (command.toLowerCase()) {
      case 'start':
        result = 'Starting the game...'
        // Add your game initialization logic here
        break
      case 'help':
        result = 'Available commands: start, help, about'
        break
      case 'about':
        result = 'This is a JavaScript game console.'
        break
      default:
        result = `Unknown command: ${command}`
    }
    printOutput(result)
  }

  function printOutput(text) {
    const outputDiv = document.createElement('div')
    outputDiv.textContent = text
    output.appendChild(outputDiv)
    output.scrollTop = output.scrollHeight
  }
})
