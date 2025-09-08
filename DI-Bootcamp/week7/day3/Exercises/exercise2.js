const colors = ["green", "red", "blue", "purple"];
const suffixes = ["st", "nd", "rd", "th"];
for (let i = 0; i < colors.length; i++) {
  console.log("My " + (i + 1) + suffixes[i] + " choice is " + colors[i]);
}