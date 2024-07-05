export function printOutput(text) {
  const outputDiv = document.createElement('div')
  outputDiv.innerHTML = typeof text === 'string' ? text.replace(/\n/g, '<br>') : ''
  output.appendChild(outputDiv)
  output.scrollTop = output.scrollHeight
}
