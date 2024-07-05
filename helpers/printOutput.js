export function printOutput(text) {
  const outputDiv = document.createElement('div')
  outputDiv.textContent = text
  output.appendChild(outputDiv)
  output.scrollTop = output.scrollHeight
}
