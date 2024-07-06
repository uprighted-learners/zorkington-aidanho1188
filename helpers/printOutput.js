export function printOutput(text) {
  var lineBreak = document.createElement('br')
  const outputDiv = document.createElement('div')
  outputDiv.innerHTML = applyNextLine(text)
  output.appendChild(outputDiv)
  output.scrollTop = output.scrollHeight
}

function applyNextLine(text) {
  if (typeof text === 'string') {
    return text.replace(/\n/g, '<br>')
  } else {
    return ''
  }
}
