function checkYear(year) {
  let message;
  if (year > 2000) {
    message = "You are in the 21st century.";
  } else {
    message = "You live in the Middle Age." ;
  }
  return message;
}

console.log(checkYear(2002)); // You are in the 21st century.
console.log(checkYear(1989)); // You live in the Middle Age.