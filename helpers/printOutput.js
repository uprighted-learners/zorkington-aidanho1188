export function printOutput(text) {
  const output = document.getElementById('output-container')
  const lineBreak = document.createElement('br')
  const outputDiv = document.createElement('div')
  outputDiv.innerHTML = applyNextLine(text)
  outputDiv.classList.add('output')
  output.appendChild(outputDiv)
  output.scrollTop = output.scrollHeight
}

function applyNextLine(text) {
  if (typeof text === 'string') {
    return text.replace(/\n/g, '<br>')
  } else {
    return 'No output provided.'
  }
}
