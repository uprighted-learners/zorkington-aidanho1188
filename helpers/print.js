function print(text) {
  let wordArr = text.split(" ");
  let size = 0;
  let phrase = "";

  for (let i = 0; i < wordArr.length; i++) {
    if (size <= 80) {
      phrase += wordArr[i] + " ";
      size += wordArr[i].length + 1;
    } else {
      console.log(phrase);
      size = 0;
      phrase = "";
      i--;
    }
  }

  if (phrase.trim() !== "") {
    console.log(phrase);
  }
}
exports.print = print;