const sentence = "The movie is not that bad, I like it";
const wordNot = sentence.indexOf("not");
const wordBad = sentence.indexOf("bad");
if (wordBad > wordNot && wordNot !== -1) {
  const newSentence = sentence.slice(0, wordNot) + "good" + sentence.slice(wordBad + 3);
  console.log(newSentence);
} else {
  console.log(sentence);
}